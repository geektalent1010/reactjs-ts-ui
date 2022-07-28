// - Import domain
import { CircleActionType } from 'constants/circleActionType';
import { ServerRequestType } from 'constants/serverRequestType';
import { List, Map } from 'immutable';
import moment from 'moment/moment';
import StringAPI from 'api/StringAPI';
import { SocialError } from 'core/domain/common/socialError';
import { Circle } from 'core/domain/circles/circle';
import { UserTie } from 'core/domain/circles/userTie';
import { User } from 'core/domain/users/user';
import { ICircleService } from 'core/services/circles/ICircleService';
import { IUserTieService } from 'core/services/circles/IUserTieService';
import { SocialProviderTypes } from 'core/socialProviderTypes';
import { ServerRequestModel } from 'models/server/serverRequestModel';
import * as globalActions from 'redux/actions/globalActions';
import * as serverActions from 'redux/actions/serverActions';
import { ServerRequestStatusType } from 'redux/actions/serverRequestStatusType';
import * as userActions from 'redux/actions/userActions';
import { throwNoValue } from 'utils/errorHandling';
import { provider } from '../../socialEngine';
import { userGetters } from '../reducers/users/userGetters';

// - Import action types
// - Import actions
/**
 * Get service providers
 */
const circleService: ICircleService = provider.get<ICircleService>(SocialProviderTypes.CircleService);
const userTieService: IUserTieService = provider.get<IUserTieService>(SocialProviderTypes.UserTieService);

/* _____________ CRUD DB _____________ */

/**
 * Add a circle
 * @param {string} circleName
 */
export const dbAddCircle = (circleName: string) => {
    return (dispatch: any, getState: Function) => {
        const state: Map<string, any> = getState();
        const uid = state.getIn(['authorize', 'uid']) as string;
        const circle: Circle = {
            creationDate: moment.utc().valueOf(),
            name: circleName,
            isSystem: false,
            ownerId: uid,
        };
        return circleService.addCircle(uid, circle).then(
            (circleKey: string) => {
                circle.id = circleKey;
                circle.ownerId = uid;
                dispatch(addCircle(Map(circle)));
            },
            (error: SocialError) => dispatch(globalActions.showMessage(error.message)),
        );
    };
};

/**
 * Add referer user to the `Following` circle of current user
 */
export const dbFollowUser = (followingCircleId: string, userFollowing: UserTie) => {
    return (dispatch: Function, getState: Function) => {
        const state: Map<string, any> = getState();
        const uid = state.getIn(['authorize', 'uid']) as string;
        const user: User = { ...userGetters.getUserProfileById(state, { userId: uid }).toJS(), userId: uid } as User;

        // Set server request status to {Sent} for following user

        const followReqestModel = createFollowRequest(throwNoValue(userFollowing.userId, 'userFollowing.userId'));
        dispatch(serverActions.sendRequest(followReqestModel));
        // Call server API
        return userTieService
            .tieUseres(
                { userId: user.userId, fullName: user.fullName, avatar: user.avatar, approved: false },
                {
                    userId: userFollowing.userId,
                    fullName: userFollowing.fullName,
                    avatar: userFollowing.avatar,
                    approved: false,
                },
                [followingCircleId],
            )
            .then(
                () => {
                    dispatch(userActions.increaseFollowCountUser(uid));
                    let userTie: Map<string, any> = Map(
                        new UserTie(
                            userFollowing.userId,
                            moment.utc().valueOf(),
                            userFollowing.fullName,
                            userFollowing.avatar,
                            false,
                        ),
                    );
                    userTie = userTie.set('circleIdList', List([followingCircleId]));

                    dispatch(addFollowingUser(userTie));

                    // Set server request status to {OK} for following user
                    followReqestModel.status = ServerRequestStatusType.OK;
                    dispatch(serverActions.sendRequest(followReqestModel));
                },
                (error: SocialError) => {
                    dispatch(globalActions.showMessage(error.message));

                    // Set server request status to {Error} for following user
                    followReqestModel.status = ServerRequestStatusType.Error;
                    dispatch(serverActions.sendRequest(followReqestModel));
                },
            );
    };
};

/**
 * Update user in circle/circles
 */
export const dbUpdateUserInCircles = (circleIdList: List<string>, userFollowing: UserTie) => {
    return (dispatch: any, getState: Function) => {
        const state: Map<string, any> = getState();
        const uid = state.getIn(['authorize', 'uid']) as string as string;
        const user: User = { ...userGetters.getUserProfileById(state, { userId: uid }).toJS(), userId: uid } as User;

        // Set server request status to {Sent}
        const addToCircleRequest = createAddToCircleRequest(throwNoValue(userFollowing.userId, 'userFollowing.userId'));
        dispatch(serverActions.sendRequest(addToCircleRequest));

        dispatch(globalActions.showMasterLoading());

        // Call server API
        return userTieService
            .updateUsersTie(
                { userId: user.userId, fullName: user.fullName, avatar: user.avatar, approved: false },
                {
                    userId: userFollowing.userId,
                    fullName: userFollowing.fullName,
                    avatar: userFollowing.avatar,
                    approved: false,
                },
                circleIdList.toJS() as Array<string>,
            )
            .then(
                () => {
                    let userTie: Map<string, any> = Map(
                        new UserTie(
                            userFollowing.userId,
                            moment.utc().valueOf(),
                            userFollowing.fullName,
                            userFollowing.avatar,
                            false,
                        ),
                    );
                    userTie = userTie.set('circleIdList', circleIdList);
                    dispatch(addFollowingUser(userTie));

                    // Set server request status to {OK}
                    addToCircleRequest.status = ServerRequestStatusType.OK;
                    dispatch(serverActions.sendRequest(addToCircleRequest));

                    dispatch(globalActions.hideMasterLoading());

                    // Close select circle box
                    const userFollowingUserId = throwNoValue(userFollowing.userId, 'userFollowing.userId');

                    dispatch(closeSelectCircleBox(userFollowingUserId));
                },
                (error: SocialError) => {
                    dispatch(globalActions.showMessage(error.message));

                    dispatch(globalActions.hideMasterLoading());

                    // Set server request status to {Error}
                    addToCircleRequest.status = ServerRequestStatusType.Error;
                    dispatch(serverActions.sendRequest(addToCircleRequest));
                },
            );
    };
};

/**
 * Delete following user
 */
export const dbDeleteFollowingUser = (userFollowingId: string) => {
    return (dispatch: any, getState: Function) => {
        const state: Map<string, any> = getState();
        const uid = state.getIn(['authorize', 'uid']) as string;

        // Set server request status to {Sent}
        const deleteFollowingUserRequest = createdeleteFollowingUserRequest(userFollowingId);
        dispatch(serverActions.sendRequest(deleteFollowingUserRequest));

        dispatch(globalActions.showMasterLoading());

        // Call server API
        return userTieService.removeUsersTie(uid, userFollowingId).then(
            () => {
                dispatch(userActions.decreaseFollowCountUser(uid));
                dispatch(deleteFollowingUser(userFollowingId));

                dispatch(globalActions.hideMasterLoading());

                // Close select circle box
                dispatch(closeSelectCircleBox(userFollowingId));

                // Set server request status to {OK}
                deleteFollowingUserRequest.status = ServerRequestStatusType.OK;
                dispatch(serverActions.sendRequest(deleteFollowingUserRequest));
            },
            (error: SocialError) => {
                dispatch(globalActions.showMessage(error.message));

                dispatch(globalActions.hideMasterLoading());

                // Close select circle box
                dispatch(closeSelectCircleBox(userFollowingId));

                // Set server request status to {Error}
                deleteFollowingUserRequest.status = ServerRequestStatusType.Error;
                dispatch(serverActions.sendRequest(deleteFollowingUserRequest));
            },
        );
    };
};

/**
 * Update a circle from database
 */
export const dbUpdateCircle = (newCircle: Circle) => {
    return (dispatch: any, getState: Function) => {
        // Get current user id
        const state: Map<string, any> = getState();
        const uid = state.getIn(['authorize', 'uid']) as string;

        // Write the new data simultaneously in the list
        let circle = state.getIn(['circle', 'circleList', newCircle.id]) as Map<string, any>;
        circle = circle.set('name', newCircle.name);
        const newCircleID = throwNoValue(newCircle.id, 'newCircle.id');
        return circleService.updateCircle(uid, newCircleID, circle.toJS() as any).then(
            () => {
                circle = circle.set('id', newCircleID);
                dispatch(updateCircle(circle));
            },
            (error: SocialError) => {
                dispatch(globalActions.showMessage(error.message));
            },
        );
    };
};

/**
 * Delete a circle from database
 */
export const dbDeleteCircle = (circleId: string) => {
    return (dispatch: any, getState: Function) => {
        // Get current user id
        const state: Map<string, any> = getState();
        const uid = state.getIn(['authorize', 'uid']) as string;

        return circleService.deleteCircle(uid, circleId).then(
            () => {
                dispatch(deleteCircle(circleId));
            },
            (error: SocialError) => {
                dispatch(globalActions.showMessage(error.message));
            },
        );
    };
};

/**
 *  Get all circles from data base belong to current user
 */
export const dbGetCircles = () => {
    return {
        type: CircleActionType.DB_FETCH_CIRCLES,
    };
};

/**
 *  Get all user ties from data base
 */
export const dbGetUserTies = () => {
    return {
        type: CircleActionType.DB_FETCH_USER_TIES,
    };
};

/**
 *  Get all followers
 */
export const dbGetFollowers = () => {
    return {
        type: CircleActionType.DB_FETCH_USER_TIEDS,
    };
};

/**
 * Get all user circles from data base by user id
 */
export const dbGetCirclesByUserId = (uid: string) => {
    return (dispatch: any) => {
        if (uid) {
            return circleService
                .getCircles(uid)
                .then((circles) => {
                    dispatch(addCircles(circles));
                })
                .catch((error: SocialError) => {
                    dispatch(globalActions.showMessage(error.message));
                });
        }
    };
};

/**
 * Create follow user serevr request model
 */
const createFollowRequest = (userFollowingId: string) => {
    const requestId = StringAPI.createServerRequestId(ServerRequestType.CircleFollowUser, userFollowingId);
    return new ServerRequestModel(ServerRequestType.CircleFollowUser, requestId, '', ServerRequestStatusType.Sent);
};

/**
 * Create add referer user to circle serevr request model
 */
const createAddToCircleRequest = (userFollowingId: string) => {
    const requestId = StringAPI.createServerRequestId(ServerRequestType.CircleAddToCircle, userFollowingId);
    return new ServerRequestModel(ServerRequestType.CircleAddToCircle, requestId, '', ServerRequestStatusType.Sent);
};

/**
 * Create delete referer user serevr request model
 */
const createdeleteFollowingUserRequest = (userFollowingId: string) => {
    const requestId = StringAPI.createServerRequestId(ServerRequestType.CircleDeleteFollowingUser, userFollowingId);
    return new ServerRequestModel(
        ServerRequestType.CircleDeleteFollowingUser,
        requestId,
        '',
        ServerRequestStatusType.Sent,
    );
};

/* _____________ CRUD State _____________ */

/**
 * Add a circle
 */
export const addCircle = (circle: Map<string, any>) => {
    return {
        type: CircleActionType.ADD_CIRCLE,
        payload: { circle },
    };
};

/**
 * Update a circle
 */
export const updateCircle = (circle: Map<string, any>) => {
    return {
        type: CircleActionType.UPDATE_CIRCLE,
        payload: { circle },
    };
};

/**
 * Delete a circle
 */
export const deleteCircle = (circleId: string) => {
    return {
        type: CircleActionType.DELETE_CIRCLE,
        payload: { circleId },
    };
};

/**
 * Add a list of circle
 */
export const addCircles = (circleList: Map<string, Map<string, any>>) => {
    return {
        type: CircleActionType.ADD_LIST_CIRCLE,
        payload: { circleList },
    };
};

/**
 * Clea all data in circle store
 */
export const clearAllCircles = () => {
    return {
        type: CircleActionType.CLEAR_ALL_CIRCLES,
    };
};

/**
 * Open circle settings
 */
export const openCircleSettings = (circleId: string) => {
    return {
        type: CircleActionType.OPEN_CIRCLE_SETTINGS,
        payload: { circleId },
    };
};

/**
 * Close open circle settings
 */
export const closeCircleSettings = (circleId: string) => {
    return {
        type: CircleActionType.CLOSE_CIRCLE_SETTINGS,
        payload: { circleId },
    };
};

/**
 * Add following user
 */
export const addFollowingUser = (userTie: Map<string, any>) => {
    return {
        type: CircleActionType.ADD_FOLLOWING_USER,
        payload: { userTie },
    };
};

/**
 * Update the user tie
 */
export const updateUserTie = (userTie: UserTie) => {
    return {
        type: CircleActionType.UPDATE_USER_TIE,
        payload: { userTie },
    };
};

/**
 * Add user ties
 */
export const addUserTies = (userTies: Map<string, any>) => {
    return {
        type: CircleActionType.ADD_USER_TIE_LIST,
        payload: { userTies },
    };
};

/**
 * Add users who send tie request for current user
 */
export const addUserTieds = (userTieds: Map<string, any>) => {
    return {
        type: CircleActionType.ADD_USER_TIED_LIST,
        payload: { userTieds },
    };
};

/**
 * Delete the user from a circle
 */
export const deleteUserFromCircle = (userId: string, circleId: string) => {
    return {
        type: CircleActionType.DELETE_USER_FROM_CIRCLE,
        payload: { userId, circleId },
    };
};

/**
 * Delete following user
 */
export const deleteFollowingUser = (userId: string) => {
    return {
        type: CircleActionType.DELETE_FOLLOWING_USER,
        payload: { userId },
    };
};

/**
 * Show the box to select circle
 */
export const showSelectCircleBox = (userId: string) => {
    return {
        type: CircleActionType.SHOW_SELECT_CIRCLE_BOX,
        payload: { userId },
    };
};

/**
 * Hide the box to select circle
 */
export const hideSelectCircleBox = (userId: string) => {
    return {
        type: CircleActionType.HIDE_SELECT_CIRCLE_BOX,
        payload: { userId },
    };
};

/**
 * Show loading on following user
 */
export const showFollowingUserLoading = (userId: string) => {
    return {
        type: CircleActionType.SHOW_FOLLOWING_USER_LOADING,
        payload: { userId },
    };
};

/**
 * Set current user selected circles for referer user
 */
export const setSelectedCircles = (userId: string, circleList: string[]) => {
    return {
        type: CircleActionType.SET_SELECTED_CIRCLES_USER_BOX_COMPONENT,
        payload: { userId, circleList },
    };
};

/**
 * Remove current user selected circles for referer user
 */
export const removeSelectedCircles = (userId: string) => {
    return {
        type: CircleActionType.REMOVE_SELECTED_CIRCLES_USER_BOX_COMPONENT,
        payload: { userId },
    };
};

/**
 * Open select circle box
 */
export const openSelectCircleBox = (userId: string) => {
    return {
        type: CircleActionType.OPEN_SELECT_CIRCLES_USER_BOX_COMPONENT,
        payload: { userId },
    };
};

/**
 * Close select circle box
 */
export const closeSelectCircleBox = (userId: string) => {
    return {
        type: CircleActionType.CLOSE_SELECT_CIRCLES_USER_BOX_COMPONENT,
        payload: { userId },
    };
};

/**
 * Hide loading on following user
 */
export const hideFollowingUserLoading = (userId: string) => {
    return {
        type: CircleActionType.HIDE_FOLLOWING_USER_LOADING,
        payload: { userId },
    };
};

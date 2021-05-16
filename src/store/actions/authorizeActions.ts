import { AuthAPI } from 'api/AuthAPI';
import { AuthorizeActionType } from 'constants/authorizeActionType';
import { OAuthType } from 'core/domain/authorize/oauthType';
import { LoginUser } from 'core/domain/authorize/loginUser';
import { SocialError } from 'core/domain/common/socialError';
import { IAuthorizeService } from 'core/services/authorize/IAuthorizeService';
import { SocialProviderTypes } from 'core/socialProviderTypes';
import { Map } from 'immutable';
import { UserRegisterModel } from 'models/users/userRegisterModel';
import { SignupStepEnum } from 'models/authorize/signupStepEnum';
import { provider } from '../../socialEngine';
import * as globalActions from 'store/actions/globalActions';
import * as serverActions from 'store/actions/serverActions';
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType';
import config from 'config';

/**
 * Loing user
 */
export const login = (user: LoginUser) => {
    return {
        type: AuthorizeActionType.LOGIN,
        payload: Map(user as any),
    };
};

/**
 * Fetch user registeration token
 */
export const fetchUserRegisterToken = (user: UserRegisterModel, captchaVerifier: string) => {
    return {
        type: AuthorizeActionType.ASYNC_FETCH_USER_REGISTER_TOKEN,
        payload: { user, captchaVerifier },
    };
};

/**
 * Set user registeration token
 */
export const setUserRegisterToken = (token: string) => {
    return {
        type: AuthorizeActionType.SET_USER_REGISTER_TOKEN,
        payload: { token },
    };
};

/**
 * Async set user login status
 */
export const asyncSetUserLoginStatus = () => {
    return {
        type: AuthorizeActionType.ASYNC_SET_LOGIN,
        payload: {},
    };
};

/**
 * Set user login status
 */
export const setUserLoginStatus = (status: boolean) => {
    return {
        type: AuthorizeActionType.SET_LOGIN,
        payload: { status },
    };
};

/**
 * Verify user registeration code
 */
export const asyncVerifyUserRegisterCode = (code: string) => {
    return {
        type: AuthorizeActionType.ASYNC_VERITY_USER_REGISTER_CODE,
        payload: { code },
    };
};

/**
 * Logout user
 */
export const logout = () => {
    return { type: AuthorizeActionType.LOGOUT };
};

/**
 * User registeration call
 * @param user  for registering
 */
export const signup = (user: UserRegisterModel) => {
    return {
        type: AuthorizeActionType.SIGNUP,
        payload: { ...user },
    };
};

/**
 * Update user's password
 */
export const updatePassword = () => {
    return { type: AuthorizeActionType.UPDATE_PASSWORD };
};

/**
 * Set signup component step
 */
export const setSignupStep = (step: SignupStepEnum) => {
    return {
        type: AuthorizeActionType.SET_SIGNUP_STEP,
        payload: { step },
    };
};

/**
 * Subscribe authorize state change
 */
export const subcribeAuthorizeStateChange = () => {
    return { type: AuthorizeActionType.SUBSCRIBE_AUTH_STATE_CHANGE };
};

/**
 * Get service providers
 */
const authorizeService: IAuthorizeService = provider.get<IAuthorizeService>(SocialProviderTypes.AuthorizeService);

/* _____________ CRUD DB _____________ */

/**
 * Log in user in server
 */
export const dbLogin = (email: string, password: string) => {
    return (dispatch: any) => {
        const loginRequest = AuthAPI.createLoginRequest(email);
        dispatch(serverActions.sendRequest(loginRequest));

        dispatch(globalActions.showNotificationRequest());

        return authorizeService.login(email, password).then(
            (result) => {
                if (!result) {
                    throw new SocialError('authService/loginuser/null', 'Login was not successful');
                }

                loginRequest.status = ServerRequestStatusType.OK;
                dispatch(serverActions.sendRequest(loginRequest));

                dispatch(globalActions.showNotificationSuccess());
                dispatch(login(result));
                //dispatch(push('/'));
            },
            (error: SocialError) => {
                loginRequest.status = ServerRequestStatusType.Error;
                dispatch(serverActions.sendRequest(loginRequest));
                dispatch(globalActions.showMessage(error.message));
            },
        );
    };
};

/**
 * Log out user in server
 */
export const dbLogout = () => {
    return (dispatch: any) => {
        authorizeService.logout();
        localStorage.removeItem('red-gold.scure.token');
        dispatch(logout());
        window.location.href = config.gateway.auth_web_uri + '/login';
    };
};

/**
 * Send email verification
 */
export const dbSendEmailVerfication = (value: any) => {
    return (dispatch: any) => {
        dispatch(globalActions.showNotificationRequest());

        return authorizeService
            .sendEmailVerification(value)
            .then(() => {
                // Send email verification successful.
                dispatch(globalActions.showNotificationSuccess());
                // dispatch(push('/'));
            })
            .catch((error: SocialError) => {
                // An error happened.
                dispatch(globalActions.showMessage(error.code));
            });
    };
};

/**
 * Change user's password
 * @param {string} newPassword
 */
export const dbUpdatePassword = (newPassword: string, confirmPassword: string) => {
    return (dispatch: any) => {
        dispatch(globalActions.showNotificationRequest());

        return authorizeService
            .updatePassword(newPassword, confirmPassword)
            .then(() => {
                // Update successful.
                dispatch(globalActions.showNotificationSuccess());
                dispatch(updatePassword());
                dispatch(dbLogout());
            })
            .catch((error: SocialError) => {
                // An error happened.
                switch (error.code) {
                    case 'auth/requires-recent-login':
                        dispatch(globalActions.showMessage(error.code));
                        dispatch(dbLogout());
                        break;
                    default:
                }
            });
    };
};

/**
 * Reset user's password
 * @param {string} newPassword
 */
export const dbResetPassword = (email: string) => {
    return (dispatch: any) => {
        dispatch(globalActions.showNotificationRequest());

        return authorizeService
            .resetPassword(email)
            .then(() => {
                // Reset password successful.
                dispatch(globalActions.showNotificationSuccess());
                // dispatch(push('/login'));
            })
            .catch((error: SocialError) => {
                // An error happened.
                dispatch(globalActions.showMessage(error.code));
            });
    };
};

/**
 * Login user with OAuth
 */
export const dbLoginWithOAuth = (type: OAuthType) => {
    return (dispatch: any) => {
        dispatch(globalActions.showNotificationRequest());

        return authorizeService
            .loginWithOAuth(type)
            .then((result: LoginUser) => {
                // Send email verification successful.
                dispatch(globalActions.showNotificationSuccess());
                dispatch(login(result));
                // dispatch(push('/'));
            })
            .catch((error: SocialError) => {
                // An error happened.
                dispatch(globalActions.showMessage(error.code));
            });
    };
};

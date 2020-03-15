// - Import react components
import { ServerActionType } from 'constants/serverActionType';
import { Map } from 'immutable';
import { ServerRequestModel } from 'models/server/serverRequestModel';
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType';

import { IServerAction } from './IServerAction';
import { ServerState } from './ServerState';

// - Import action types
// Import domain

/**
 * Server actions
 * @param {object} state
 * @param {object} action
 */
export let serverReducer = (state = Map(new ServerState() as any), action: IServerAction) => {
  let { payload } = action
  switch (action.type) {

    /* _____________ CRUD _____________ */
    case ServerActionType.ADD_REQUEST:
    
      return state
        .setIn(['request', payload.request.get('id', 'no-id')], payload.request)

    case ServerActionType.DELETE_REQUEST:
      return state
        .deleteIn(['request', payload.request.get('id', 'no-id')])

    case ServerActionType.ERROR_REQUEST:
      return state
        .setIn(['request', payload.request.get('id', 'no-id'), 'status'], ServerRequestStatusType.Error)

    case ServerActionType.OK_REQUEST:
      return state
        .setIn(['request', payload.request.get('id', 'no-id'), 'status'], ServerRequestStatusType.OK)

    case ServerActionType.CLEAR_ALL_DATA_REQUEST:
      return Map(new ServerState() as any)

    default:
      return state
  }
}

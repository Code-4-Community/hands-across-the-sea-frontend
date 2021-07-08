import { GetAllUsersResponse, UserDirectoryReducerState } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { allUsers } from './actions';
import { C4CAction } from '../../../store';

export const initialUserDirectoryState: UserDirectoryReducerState = {
  allUsers: AsyncRequestNotStarted<GetAllUsersResponse, any>(),
};

const allUsersRequestReducer = generateAsyncRequestReducer<
  UserDirectoryReducerState,
  GetAllUsersResponse,
  void
>(allUsers.key);

const reducers = (
  state: UserDirectoryReducerState = initialUserDirectoryState,
  action: C4CAction,
): UserDirectoryReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        allUsers: allUsersRequestReducer(state.allUsers, action),
      };
    default:
      return state;
  }
};

export default reducers;

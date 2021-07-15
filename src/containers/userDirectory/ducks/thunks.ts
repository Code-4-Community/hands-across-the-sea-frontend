import { GetAllUsersResponse, UserDirectoryThunkAction } from './types';
import { allUsers } from './actions';

export const loadAllUsers = (): UserDirectoryThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    dispatch(allUsers.loading());
    return protectedApiClient
      .getAllUsers()
      .then((response: GetAllUsersResponse) => {
        dispatch(allUsers.loaded(response));
      })
      .catch((error) => {
        dispatch(allUsers.failed(error.response.data));
      });
  };
};

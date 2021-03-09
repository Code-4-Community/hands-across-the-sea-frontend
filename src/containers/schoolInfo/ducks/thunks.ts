import {
  LoginRequest,
  TokenPayload,
  UserAuthenticationThunkAction,
} from '../../../auth/ducks/types';
import { authenticateUser } from '../../../auth/ducks/actions';
import AppAxiosInstance from '../../../auth/axios';
import {SchoolRequest} from './types';

export const createSchool = (
  schoolRequest: SchoolRequest,
): UserAuthenticationThunkAction<void> => {
  return (dispatch, getState, { authClient }): Promise<void> => {
    dispatch(authenticateUser.loading());
    return authClient
      .login(loginRequest)
      .then((response: TokenPayload) => {
        AppAxiosInstance.defaults.headers['X-Access-Token'] =
          response.accessToken;
        dispatch(authenticateUser.loaded(response));
      })
      .catch((error) => {
        dispatch(authenticateUser.failed(error.response.data));
      });
  };
};

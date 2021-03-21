import {
  LoginRequest,
  TokenPayload,
  UserAuthenticationThunkAction,
} from '../../../auth/ducks/types';
import { authenticateUser } from '../../../auth/ducks/actions';
import AppAxiosInstance from '../../../auth/axios';
import { SchoolRequest, SchoolResponse } from "./types";

export const createSchool = (
  schoolRequest: SchoolRequest,
): UserAuthenticationThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }): Promise<void> => {
    dispatch(authenticateUser.loading());
    return protectedApiClient
      .createSchool(schoolRequest)
      .then((response: SchoolResponse) => {
        dispatch(authenticateUser.loaded(response));
      })
      .catch((error) => {
        dispatch(authenticateUser.failed(error.response.data));
      });
  };
};

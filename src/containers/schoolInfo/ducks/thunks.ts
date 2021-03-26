import {
  SchoolInformationThunkAction,
  SchoolRequest,
  SchoolResponse,
} from './types';
import { createSchool, getSchool } from './actions';

export const createSchoolRequest = (
  schoolRequest: SchoolRequest,
): SchoolInformationThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }): Promise<void> => {
    dispatch(createSchool.loading());
    return protectedApiClient
      .createSchool(schoolRequest)
      .then((response: SchoolResponse) => {
        dispatch(createSchool.loaded(response));
      })
      .catch((error) => {
        dispatch(createSchool.failed(error.response)); // TODO: make typesafe with utils
      });
  };
};

export const getSchoolRequest = (
  id: number,
): SchoolInformationThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }): Promise<void> => {
    dispatch(getSchool.loading());
    return protectedApiClient
      .getSchool(id)
      .then((response: SchoolResponse) => {
        dispatch(getSchool.loaded(response));
      })
      .catch((error) => {
        dispatch(getSchool.failed(error.response)); // TODO: make typesafe with utils
      });
  };
};

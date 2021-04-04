import {
  SchoolInformationThunkAction,
  SchoolRequest,
  SchoolResponse,
} from './types';
import { getSchool } from './actions';

export const createSchoolRequest = (
  schoolRequest: SchoolRequest,
): SchoolInformationThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }): Promise<void> => {
    dispatch(getSchool.loading());
    return protectedApiClient
      .createSchool(schoolRequest)
      .then((response: SchoolResponse) => {
        dispatch(getSchool.loaded(response));
      })
      .catch((error) => {
        dispatch(getSchool.failed(error.response)); // TODO: make typesafe with utils
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

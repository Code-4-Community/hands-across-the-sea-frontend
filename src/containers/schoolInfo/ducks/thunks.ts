import {
  SchoolInformationThunkAction,
  SchoolRequest,
  SchoolResponse,
} from './types';
import { schoolInformation } from './actions';

export const createSchoolRequest = (
  schoolRequest: SchoolRequest,
): SchoolInformationThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }): Promise<void> => {
    dispatch(schoolInformation.loading());
    return protectedApiClient
      .createSchool(schoolRequest)
      .then((response: SchoolResponse) => {
        dispatch(schoolInformation.loaded(response));
      })
      .catch((error) => {
        dispatch(schoolInformation.failed(error.response)); // TODO: make typesafe with utils
      });
  };
};

export const getSchoolRequest = (
  id: number,
): SchoolInformationThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }): Promise<void> => {
    dispatch(schoolInformation.loading());
    return protectedApiClient
      .getSchool(id)
      .then((response: SchoolResponse) => {
        dispatch(schoolInformation.loaded(response));
      })
      .catch((error) => {
        dispatch(schoolInformation.failed(error.response)); // TODO: make typesafe with utils
      });
  };
};

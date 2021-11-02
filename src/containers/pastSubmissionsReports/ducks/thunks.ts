import { PastSubmissionsReportsThunkAction } from './types';
import { pastSubmissionsReports } from './actions';

export const getPastSubmissionsReports = (
  schoolId: number,
  page: number,
): PastSubmissionsReportsThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }): Promise<void> => {
    dispatch(pastSubmissionsReports.loading());
    return protectedApiClient
      .getPastSubmissionReports(schoolId, page)
      .then((response) => {
        dispatch(pastSubmissionsReports.loaded(response));
      })
      .catch((error) => {
        window.location.href = "/error";
        dispatch(pastSubmissionsReports.failed(error.response.data));
      });
  };
};

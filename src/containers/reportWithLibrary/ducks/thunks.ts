import {
  ReportWithLibraryRequest,
  ReportWithLibraryResponse,
  ReportWithLibraryThunkAction,
} from './types';
import { reportWithLibrary } from './actions';

export const loadReportWithLibrary = (
  reportId: number,
): ReportWithLibraryThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    dispatch(reportWithLibrary.loading());
    return protectedApiClient
      .getReportWithLibrary(reportId)
      .then((response: ReportWithLibraryResponse) => {
        dispatch(reportWithLibrary.loaded(response));
      })
      .catch((error) => {
        dispatch(reportWithLibrary.failed(error.repsonse.data));
      });
  };
};

export const createReportWithLibrary = (
  schoolId: number,
  report: ReportWithLibraryRequest,
): ReportWithLibraryThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    return protectedApiClient
      .createReportWithLibrary(schoolId, report)
      .then(() => {
        dispatch(loadReportWithLibrary(schoolId));
      })
      .catch((error) => {
        dispatch(reportWithLibrary.failed(error.response.data));
      });
  };
};

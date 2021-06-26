import {
  ReportWithLibraryRequest,
  LibraryReportThunkAction,
  LibraryReportResponse,
  ReportWithoutLibraryRequest,
} from './types';
import { latestLibraryReport } from './actions';

export const loadLatestLibraryReport = (
  schoolId: number,
): LibraryReportThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    dispatch(latestLibraryReport.loading());
    return protectedApiClient
      .getLatestReport(schoolId)
      .then((response: LibraryReportResponse) => {
        dispatch(latestLibraryReport.loaded(response));
      })
      .catch((error) => {
        dispatch(latestLibraryReport.failed(error.response.data));
      });
  };
};

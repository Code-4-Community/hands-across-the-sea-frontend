import {
  ReportWithLibraryRequest,
  LibraryReportThunkAction, LibraryReportResponse, ReportWithoutLibraryRequest,
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

export const createReportWithLibrary = (
  schoolId: number,
  report: ReportWithLibraryRequest,
): LibraryReportThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    return protectedApiClient
      .createReportWithLibrary(schoolId, report)
      .then(() => {
        dispatch(loadLatestLibraryReport(schoolId));
      })
      .catch((error) => {
        dispatch(latestLibraryReport.failed(error.response.data));
      });
  };
};

export const createReportWithoutLibrary = (
  schoolId: number,
  report: ReportWithoutLibraryRequest,
): LibraryReportThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    return protectedApiClient
      .createReportWithoutLibrary(schoolId, report)
      .then(() => {
        dispatch(loadLatestLibraryReport(schoolId));
      })
      .catch((error) => {
        dispatch(latestLibraryReport.failed(error.response.data));
      });
  };
};

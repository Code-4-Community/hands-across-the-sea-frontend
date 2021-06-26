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

export const createReportWithLibrary = (
  schoolId: number,
  report: ReportWithLibraryRequest,
): LibraryReportThunkAction<void> => {
  return async (dispatch, _getState, { protectedApiClient }) => {
    return await protectedApiClient
      .createReportWithLibrary(schoolId, report)
      .then(() => {
        dispatch(loadLatestLibraryReport(schoolId));
      })
      .catch((error) => {
        dispatch(latestLibraryReport.failed(error.response.data));
        throw new Error('Failed to post report');
      });
  };
};

export const createReportWithoutLibrary = (
  schoolId: number,
  report: ReportWithoutLibraryRequest,
): LibraryReportThunkAction<void> => {
  return async (dispatch, getState, { protectedApiClient }) => {
    return await protectedApiClient
      .createReportWithoutLibrary(schoolId, report)
      .then(() => {
        dispatch(loadLatestLibraryReport(schoolId));
      })
      .catch((error) => {
        dispatch(latestLibraryReport.failed(error.response.data));
        throw new Error('Failed to post report');
      });
  };
};

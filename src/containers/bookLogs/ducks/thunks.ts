import { BookLogRequest, BookLogResponse, BookLogsThunkAction } from './types';
import { loadBookLogs } from './actions';

export const getBookLogs = (schoolId: number): BookLogsThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    dispatch(loadBookLogs.loading());
    return protectedApiClient
      .getBookLogs(schoolId)
      .then((response: BookLogResponse[]) => {
        dispatch(loadBookLogs.loaded(response));
      })
      .catch((error) => {
        dispatch(loadBookLogs.failed(error.response.data));
      });
  };
};

export const updateBookLog = (
  schoolId: number,
  bookLogId: number,
  updatedLog: BookLogRequest,
): BookLogsThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    return protectedApiClient
      .updateBookLog(schoolId, bookLogId, updatedLog)
      .then(() => {
        dispatch(getBookLogs(schoolId));
      })
      .catch((error) => {
        dispatch(loadBookLogs.failed(error.response.data));
      });
  };
};

export const createBookLog = (
  schoolId: number,
  bookLogId: number,
  updatedLog: BookLogRequest,
): BookLogsThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    return protectedApiClient
      .createBookLog(schoolId, updatedLog)
      .then(() => {
        dispatch(getBookLogs(schoolId));
      })
      .catch((error) => {
        dispatch(loadBookLogs.failed(error.response.data));
      });
  };
};

export const deleteBookLog = (
  schoolId: number,
  bookLogId: number,
): BookLogsThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    return protectedApiClient
      .deleteSchoolContact(schoolId, bookLogId)
      .then(() => {
        dispatch(getBookLogs(schoolId));
      })
      .catch((error) => {
        dispatch(loadBookLogs.failed(error.response.data));
      });
  };
};

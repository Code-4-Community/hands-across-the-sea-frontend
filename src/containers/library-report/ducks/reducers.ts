import { LibraryReportReducerState, LibraryReportResponse } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { C4CAction } from '../../../store';
import { latestLibraryReport, SET_IS_YES_REPORT } from './actions';

export const initialLibraryReportState: LibraryReportReducerState = {
  latestReport: AsyncRequestNotStarted<LibraryReportResponse, any>(),
};

const libraryReportReducer = generateAsyncRequestReducer<
  LibraryReportReducerState,
  LibraryReportResponse,
  void
>(latestLibraryReport.key);

const reducers = (
  state: LibraryReportReducerState = initialLibraryReportState,
  action: C4CAction,
): LibraryReportReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        latestReport: libraryReportReducer(state.latestReport, action),
      };
    case SET_IS_YES_REPORT:
      return {
        ...state,
        isYesReport: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;

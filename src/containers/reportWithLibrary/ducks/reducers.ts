import {
  ReportWithLibraryReducerState,
  ReportWithLibraryResponse,
} from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { C4CAction } from '../../../store';
import { reportWithLibrary } from './actions';

export const initialReportWithLibraryState: ReportWithLibraryReducerState = {
  reportWithLibrary: AsyncRequestNotStarted<ReportWithLibraryResponse, any>(),
};

const reportWithLibraryReducer = generateAsyncRequestReducer<
  ReportWithLibraryReducerState,
  ReportWithLibraryResponse,
  void
>(reportWithLibrary.key);

const reducers = (
  state: ReportWithLibraryReducerState = initialReportWithLibraryState,
  action: C4CAction,
): ReportWithLibraryReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        reportWithLibrary: reportWithLibraryReducer(
          state.reportWithLibrary,
          action,
        ),
      };
    default:
      return state;
  }
};

export default reducers;

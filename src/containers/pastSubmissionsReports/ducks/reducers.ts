import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { C4CAction } from '../../../store';
import {
  PastSubmissionsReportsReducerState,
  ReportGenericListResponse,
} from './types';
import { pastSubmissionsReports } from './actions';

export const initialPastSubmissionsReports: PastSubmissionsReportsReducerState = {
  pastSubmissionsReports: AsyncRequestNotStarted<ReportGenericListResponse>(),
};

const pastSubmissionsReportsReducer = generateAsyncRequestReducer<
  PastSubmissionsReportsReducerState,
  ReportGenericListResponse,
  void
>(pastSubmissionsReports.key);

const reducers = (
  state: PastSubmissionsReportsReducerState = initialPastSubmissionsReports,
  action: C4CAction,
): PastSubmissionsReportsReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        pastSubmissionsReports: pastSubmissionsReportsReducer(
          state.pastSubmissionsReports,
          action,
        ),
      };
    default:
      return state;
  }
};

export default reducers;

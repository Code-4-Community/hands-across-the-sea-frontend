import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { C4CAction } from '../../../store';
import {
  PastSubmissionsSchoolsReducerState,
  PastSubmissionsSchoolsResponse,
} from './types';
import {
  pastSubmissionsSchools,
  SET_PAST_SUBMISSIONS_SCHOOL_ID,
} from './actions';

export const initialPastSubmissionsSchools: PastSubmissionsSchoolsReducerState = {
  pastSubmissionsSchools: AsyncRequestNotStarted<PastSubmissionsSchoolsResponse>(),
};

const pastSubmissionsSchoolsReducer = generateAsyncRequestReducer<
  PastSubmissionsSchoolsReducerState,
  PastSubmissionsSchoolsResponse,
  void
>(pastSubmissionsSchools.key);

const reducers = (
  state: PastSubmissionsSchoolsReducerState = initialPastSubmissionsSchools,
  action: C4CAction,
): PastSubmissionsSchoolsReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        pastSubmissionsSchools: pastSubmissionsSchoolsReducer(
          state.pastSubmissionsSchools,
          action,
        ),
      };
    case SET_PAST_SUBMISSIONS_SCHOOL_ID:
      return {
        ...state,
        pastSubmissionSelectedSchoolId: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;

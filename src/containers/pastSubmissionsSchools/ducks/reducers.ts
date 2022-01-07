import { C4CAction } from '../../../store';
import { SET_PAST_SUBMISSIONS_SCHOOL_ID } from './actions';
import { PastSubmissionsSchoolsReducerState } from './types';

export const initialPastSubmissionsSchools: PastSubmissionsSchoolsReducerState =
  {};

const reducers = (
  state: PastSubmissionsSchoolsReducerState = initialPastSubmissionsSchools,
  action: C4CAction,
): PastSubmissionsSchoolsReducerState => {
  switch (action.type) {
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

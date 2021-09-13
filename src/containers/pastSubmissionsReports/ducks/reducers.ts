import { C4CAction } from '../../../store';
import { SET_ACTIVE_REPORT } from './actions';
import { PastSubmissionsReportsReducerState } from './types';

export const initialPastSubmissionsReports: PastSubmissionsReportsReducerState = {};

const reducers = (
  state: PastSubmissionsReportsReducerState = initialPastSubmissionsReports,
  action: C4CAction,
): PastSubmissionsReportsReducerState => {
  switch (action.type) {
    case SET_ACTIVE_REPORT:
      return {
        ...state,
        activeReport: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;

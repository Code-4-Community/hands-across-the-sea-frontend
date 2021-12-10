import { SelectSchoolReducerState } from './types';
import { SET_SCHOOL_ID } from './actions';
import { C4CAction } from '../../../store';

export const initialSelectSchoolState: SelectSchoolReducerState = {};

const reducers = (
  state: SelectSchoolReducerState = initialSelectSchoolState,
  action: C4CAction,
): SelectSchoolReducerState => {
  switch (action.type) {
    case SET_SCHOOL_ID:
      return {
        ...state,
        selectedSchoolId: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;

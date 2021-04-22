import { SchoolEntry, SelectSchoolReducerState } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { getAllSchools, SET_SCHOOL_ID } from './actions';
import { C4CAction } from '../../../store';

export const initialSelectSchoolState: SelectSchoolReducerState = {
  schools: AsyncRequestNotStarted<SchoolEntry[]>(),
};

const loadSchoolRequestReducer = generateAsyncRequestReducer<
  SelectSchoolReducerState,
  SchoolEntry[],
  void
>(getAllSchools.key);

const reducers = (
  state: SelectSchoolReducerState = initialSelectSchoolState,
  action: C4CAction,
): SelectSchoolReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        schools: loadSchoolRequestReducer(state.schools, action),
      };
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

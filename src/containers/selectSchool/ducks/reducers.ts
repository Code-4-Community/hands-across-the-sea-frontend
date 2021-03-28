import { SchoolEntry, SelectSchoolReducerState } from './types';
import {
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { loadSchools } from './actions';
import { C4CAction } from '../../../store';

export const initialSelectSchoolState: SelectSchoolReducerState = {
  schools: AsyncRequestNotStarted<SchoolEntry[]>(),
};

const loadSchoolRequestReducer = generateAsyncRequestReducer<
  SelectSchoolReducerState,
  SchoolEntry[],
  void
>(loadSchools.key);

const reducers = (
  state: SelectSchoolReducerState = initialSelectSchoolState,
  action: C4CAction,
): SelectSchoolReducerState => {

}

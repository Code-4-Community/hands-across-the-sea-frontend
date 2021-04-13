import { SchoolContactResponse, SchoolContactsReducerState } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { schoolContacts } from './actions';
import { C4CAction } from '../../../store';

export const initialSchoolContactsState: SchoolContactsReducerState = {
  schoolContacts: AsyncRequestNotStarted<SchoolContactResponse[], any>(),
};

const schoolContactsReducer = generateAsyncRequestReducer<
  SchoolContactsReducerState,
  SchoolContactResponse[],
  void
>(schoolContacts.key);

const reducers = (
  state: SchoolContactsReducerState = initialSchoolContactsState,
  action: C4CAction,
): SchoolContactsReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        schoolContacts: schoolContactsReducer(state.schoolContacts, action),
      };
    default:
      return state;
  }
};

export default reducers;

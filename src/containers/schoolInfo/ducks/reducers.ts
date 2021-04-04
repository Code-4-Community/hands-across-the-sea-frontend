import { SchoolInformationReducerState, SchoolResponse } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { C4CAction } from '../../../store';
import { getSchool } from './actions';

export const initialSchoolInfoState: SchoolInformationReducerState = {
  schoolInformation: AsyncRequestNotStarted<SchoolResponse, any>(),
};

const schoolInformationRequestReducer = generateAsyncRequestReducer<
  SchoolInformationReducerState,
  SchoolResponse,
  any
>(getSchool.key);

const reducers = (
  state: SchoolInformationReducerState = initialSchoolInfoState,
  action: C4CAction,
): SchoolInformationReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        schoolInformation: schoolInformationRequestReducer(
          state.schoolInformation,
          action,
        ),
      };
    default:
      return state;
  }
};

export default reducers;

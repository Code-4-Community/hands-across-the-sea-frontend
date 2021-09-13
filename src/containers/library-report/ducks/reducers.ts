import { LibraryReportReducerState, LibraryReportResponse } from './types';
import {
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { C4CAction } from '../../../store';
import { SET_IS_YES_REPORT } from './actions';

export const initialLibraryReportState: LibraryReportReducerState = {};

const reducers = (
  state: LibraryReportReducerState = initialLibraryReportState,
  action: C4CAction,
): LibraryReportReducerState => {
  switch (action.type) {
    case SET_IS_YES_REPORT:
      return {
        ...state,
        isYesReport: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;

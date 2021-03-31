import { asyncRequestIsComplete } from '../../../utils/asyncRequest';
import {
  ReportWithLibraryReducerState,
  ReportWithLibraryResponse,
} from './types';

export const getReportWithLibrary = (
  state: ReportWithLibraryReducerState,
): ReportWithLibraryResponse | null => {
  if (asyncRequestIsComplete(state.reportWithLibrary)) {
    return state.reportWithLibrary.result;
  }
  return null;
};

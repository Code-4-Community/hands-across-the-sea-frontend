import { asyncRequestIsComplete } from '../../../utils/asyncRequest';
import {
  LibraryReportReducerState, LibraryReportResponse,
} from './types';

export const getReportWithLibrary = (
  state: LibraryReportReducerState,
): LibraryReportResponse | null => {
  if (asyncRequestIsComplete(state.latestReport)) {
    return state.latestReport.result;
  }
  return null;
};

import { asyncRequestIsComplete } from '../../../utils/asyncRequest';
import {
  LibraryReportReducerState,
  ReportWithLibraryResponse,
} from './types';

export const getReportWithLibrary = (
  state: LibraryReportReducerState,
): ReportWithLibraryResponse | null => {
  if (asyncRequestIsComplete(state.latestReport)) {
    return state.latestReport.result;
  }
  return null;
};

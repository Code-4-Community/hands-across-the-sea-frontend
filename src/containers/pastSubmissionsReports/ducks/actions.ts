import { Action } from '../../../store';
import { LibraryReportResponse } from '../../library-report/ducks/types';

export const SET_ACTIVE_REPORT = 'setActiveReport';

export const setActiveReport = (
  report?: LibraryReportResponse,
): Action<typeof SET_ACTIVE_REPORT, LibraryReportResponse | undefined> => ({
  type: SET_ACTIVE_REPORT,
  payload: report,
});

export type PastSubmissionsReportsActions = ReturnType<typeof setActiveReport>;

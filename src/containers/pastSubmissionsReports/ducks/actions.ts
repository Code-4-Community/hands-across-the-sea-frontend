import { genericAsyncActions } from '../../../utils/asyncRequest';
import { ReportGenericListResponse } from './types';
import { LibraryReportResponse } from '../../library-report/ducks/types';
import { Action } from '../../../store';

export const pastSubmissionsReports = genericAsyncActions<
  ReportGenericListResponse,
  any
>();

export const SET_ACTIVE_REPORT = 'setActiveReport';

export const setActiveReport = (
  report?: LibraryReportResponse,
): Action<typeof SET_ACTIVE_REPORT, LibraryReportResponse | undefined> => ({
  type: SET_ACTIVE_REPORT,
  payload: report,
});

export type PastSubmissionsReportsActions =
  | ReturnType<typeof setActiveReport>
  | ReturnType<typeof pastSubmissionsReports.loading>
  | ReturnType<typeof pastSubmissionsReports.loaded>
  | ReturnType<typeof pastSubmissionsReports.failed>;

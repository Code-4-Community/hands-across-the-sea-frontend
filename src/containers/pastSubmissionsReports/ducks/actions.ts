import { genericAsyncActions } from '../../../utils/asyncRequest';
import { ReportGenericListResponse } from './types';

export const pastSubmissionsReports = genericAsyncActions<
  ReportGenericListResponse,
  any
>();

export type PastSubmissionsReportsActions =
  | ReturnType<typeof pastSubmissionsReports.loading>
  | ReturnType<typeof pastSubmissionsReports.loaded>
  | ReturnType<typeof pastSubmissionsReports.failed>;

import { ThunkAction } from 'redux-thunk';
import { C4CState } from '../../../store';
import { ApiExtraArgs } from '../../../api/protectedApiClient';
import { PastSubmissionsReportsActions } from './actions';
import { AsyncRequest } from '../../../utils/asyncRequest';
import { LibraryReportResponse } from '../../library-report/ducks/types';

export type PastSubmissionsReportsThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ApiExtraArgs,
  PastSubmissionsReportsActions
>;

export interface PastSubmissionsReportsReducerState {
  readonly pastSubmissionsReports: AsyncRequest<ReportGenericListResponse>;
}

export interface ReportGenericListResponse {
  count: number;
  reports: LibraryReportResponse[];
}

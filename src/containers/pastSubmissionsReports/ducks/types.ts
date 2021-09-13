import { ThunkAction } from 'redux-thunk';
import { ApiExtraArgs } from '../../../api/protectedApiClient';
import { C4CState } from '../../../store';
import { LibraryReportResponse } from '../../library-report/ducks/types';
import { PastSubmissionsReportsActions } from './actions';

export type PastSubmissionsReportsThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ApiExtraArgs,
  PastSubmissionsReportsActions
>;

export interface PastSubmissionsReportsReducerState {
  readonly activeReport?: LibraryReportResponse;
}

export interface ReportGenericListResponse {
  count: number;
  reports: LibraryReportResponse[];
}

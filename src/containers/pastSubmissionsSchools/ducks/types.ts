import { ThunkAction } from 'redux-thunk';
import { ApiExtraArgs } from '../../../api/protectedApiClient';
import { C4CState } from '../../../store';
import { PastSubmissionsSchoolsActions } from './actions';

export type PastSubmissionsThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ApiExtraArgs,
  PastSubmissionsSchoolsActions
>;

export interface PastSubmissionsSchoolsReducerState {
  readonly pastSubmissionSelectedSchoolId?: number;
}

export type PastSubmissionsSchoolsResponse = {
  readonly count: number;
  readonly schools: SchoolSummaryResponse[];
};

export type SchoolSummaryResponse = {
  readonly id: number;
  readonly name: string;
  readonly country: string;
};

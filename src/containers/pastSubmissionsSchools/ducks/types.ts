import { ThunkAction } from 'redux-thunk';
import { C4CState } from '../../../store';
import { ApiExtraArgs } from '../../../api/protectedApiClient';
import { PastSubmissionsSchoolsActions } from './actions';
import { AsyncRequest } from '../../../utils/asyncRequest';

export type PastSubmissionsThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ApiExtraArgs,
  PastSubmissionsSchoolsActions
>;

export interface PastSubmissionsSchoolsReducerState {
  readonly pastSubmissionsSchools: AsyncRequest<PastSubmissionsSchoolsResponse>;
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

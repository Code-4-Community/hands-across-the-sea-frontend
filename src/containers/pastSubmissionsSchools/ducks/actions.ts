import { genericAsyncActions } from '../../../utils/asyncRequest';
import { PastSubmissionsSchoolsResponse } from './types';
import { Action } from '../../../store';

export const pastSubmissionsSchools = genericAsyncActions<
  PastSubmissionsSchoolsResponse,
  any
>();

export type PastSubmissionsSchoolsActions =
  | ReturnType<typeof setPastSubmissionsSchoolId>
  | ReturnType<typeof pastSubmissionsSchools.loading>
  | ReturnType<typeof pastSubmissionsSchools.loaded>
  | ReturnType<typeof pastSubmissionsSchools.failed>;

export const SET_PAST_SUBMISSIONS_SCHOOL_ID = 'setPastSubmissionsSchoolId';

export const setPastSubmissionsSchoolId = (
  schoolId?: number,
): Action<typeof SET_PAST_SUBMISSIONS_SCHOOL_ID, number | undefined> => ({
  type: SET_PAST_SUBMISSIONS_SCHOOL_ID,
  payload: schoolId,
});

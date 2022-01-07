import { Action } from '../../../store';

export type PastSubmissionsSchoolsActions = ReturnType<
  typeof setPastSubmissionsSchoolId
>;

export const SET_PAST_SUBMISSIONS_SCHOOL_ID = 'setPastSubmissionsSchoolId';

export const setPastSubmissionsSchoolId = (
  schoolId?: number,
): Action<typeof SET_PAST_SUBMISSIONS_SCHOOL_ID, number | undefined> => ({
  type: SET_PAST_SUBMISSIONS_SCHOOL_ID,
  payload: schoolId,
});

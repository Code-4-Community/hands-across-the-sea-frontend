import { Action } from '../../../store';

export const SET_SCHOOL_ID = 'setSchoolId';

export const selectSchoolId = (
  schoolId?: number,
): Action<typeof SET_SCHOOL_ID, number | undefined> => ({
  type: SET_SCHOOL_ID,
  payload: schoolId,
});

export type SelectSchoolActions = ReturnType<typeof selectSchoolId>;

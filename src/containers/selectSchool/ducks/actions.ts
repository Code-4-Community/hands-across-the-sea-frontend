import { genericAsyncActions } from '../../../utils/asyncRequest';
import { Action } from '../../../store';
import { SchoolEntry } from './types';

export const getAllSchools = genericAsyncActions<SchoolEntry[], string>();

export const SET_SCHOOL_ID = 'setSchoolId';

export const selectSchoolId = (
  schoolId?: number,
): Action<typeof SET_SCHOOL_ID, number | undefined> => ({
  type: SET_SCHOOL_ID,
  payload: schoolId,
});

export type SelectSchoolActions =
  | ReturnType<typeof selectSchoolId>
  | ReturnType<typeof getAllSchools.loading>
  | ReturnType<typeof getAllSchools.loaded>
  | ReturnType<typeof getAllSchools.failed>;

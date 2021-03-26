import { genericAsyncActions } from '../../../utils/asyncRequest';
import { SchoolResponse } from './types';

export const createSchool = genericAsyncActions<SchoolResponse, any>();
export const getSchool = genericAsyncActions<SchoolResponse, any>();

export type SchoolInfoActions =
  | ReturnType<typeof createSchool.loading>
  | ReturnType<typeof createSchool.loaded>
  | ReturnType<typeof createSchool.failed>
  | ReturnType<typeof getSchool.loading>
  | ReturnType<typeof getSchool.loaded>
  | ReturnType<typeof getSchool.failed>;

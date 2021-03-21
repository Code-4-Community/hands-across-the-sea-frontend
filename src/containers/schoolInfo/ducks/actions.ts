import { genericAsyncActions } from '../../../utils/asyncRequest';
import { SchoolResponse } from './types';

export const createSchool = genericAsyncActions<SchoolResponse, any>();

export type SchoolInfoActions =
  | ReturnType<typeof createSchool.loading>
  | ReturnType<typeof createSchool.loaded>
  | ReturnType<typeof createSchool.failed>;

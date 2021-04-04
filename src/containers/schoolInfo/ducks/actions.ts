import { genericAsyncActions } from '../../../utils/asyncRequest';
import { SchoolResponse } from './types';

export const getSchool = genericAsyncActions<SchoolResponse, any>();

export type SchoolInformationActions =
  | ReturnType<typeof getSchool.loading>
  | ReturnType<typeof getSchool.loaded>
  | ReturnType<typeof getSchool.failed>;

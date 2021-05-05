import { genericAsyncActions } from '../../../utils/asyncRequest';
import { SchoolResponse } from './types';

export const schoolInformation = genericAsyncActions<SchoolResponse, any>();

export type SchoolInformationActions =
  | ReturnType<typeof schoolInformation.loading>
  | ReturnType<typeof schoolInformation.loaded>
  | ReturnType<typeof schoolInformation.failed>;

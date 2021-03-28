import { genericAsyncActions } from '../../../utils/asyncRequest';

export const loadSchools = genericAsyncActions<void, void>();

export type SelectSchoolActions =
  | ReturnType<typeof loadSchools.loading>
  | ReturnType<typeof loadSchools.loaded>
  | ReturnType<typeof loadSchools.failed>;

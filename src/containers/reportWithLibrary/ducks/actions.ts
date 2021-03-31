import { genericAsyncActions } from '../../../utils/asyncRequest';
import { ReportWithLibraryResponse } from './types';

export const reportWithLibrary = genericAsyncActions<
  ReportWithLibraryResponse,
  any
>();

export type ReportWithLibraryActions =
  | ReturnType<typeof reportWithLibrary.loading>
  | ReturnType<typeof reportWithLibrary.loaded>
  | ReturnType<typeof reportWithLibrary.failed>;

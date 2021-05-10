import { genericAsyncActions } from '../../../utils/asyncRequest';
import { LibraryReportResponse } from './types';
import { Action } from '../../../store';

export const latestLibraryReport = genericAsyncActions<
  LibraryReportResponse,
  any
>();

export const SET_IS_YES_REPORT = 'setIsYesReport';
export const setIsYesReport = (
  yesOrNo: boolean,
): Action<typeof SET_IS_YES_REPORT, boolean> => ({
  type: SET_IS_YES_REPORT,
  payload: yesOrNo,
});

export type LibraryReportActions =
  | ReturnType<typeof latestLibraryReport.loading>
  | ReturnType<typeof latestLibraryReport.loaded>
  | ReturnType<typeof latestLibraryReport.failed>
  | ReturnType<typeof setIsYesReport>;

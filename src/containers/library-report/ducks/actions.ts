import { Action } from '../../../store';

export const SET_IS_YES_REPORT = 'setIsYesReport';
export const setIsYesReport = (
  yesOrNo: boolean,
): Action<typeof SET_IS_YES_REPORT, boolean> => ({
  type: SET_IS_YES_REPORT,
  payload: yesOrNo,
});

export type LibraryReportActions = ReturnType<typeof setIsYesReport>;

import { genericAsyncActions } from '../../../utils/asyncRequest';
import { BookLogResponse } from './types';

export const loadBookLogs = genericAsyncActions<BookLogResponse[], any>();

export type BookLogsActions =
  | ReturnType<typeof loadBookLogs.loading>
  | ReturnType<typeof loadBookLogs.loaded>
  | ReturnType<typeof loadBookLogs.failed>;

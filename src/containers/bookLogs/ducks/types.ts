import { ThunkAction } from 'redux-thunk';
import { C4CState } from '../../../store';
import { ApiExtraArgs } from '../../../api/protectedApiClient';
import { BookLogsActions } from './actions';
import { AsyncRequest } from '../../../utils/asyncRequest';
import { Moment } from 'moment';

export type BookLogsThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ApiExtraArgs,
  BookLogsActions
>;

export interface BookLogsReducerState {
  readonly bookLogs: AsyncRequest<BookLogResponse[], any>;
}

export interface BookLogRequest {
  count: number;
  date: string | Moment;
  id: number;
  notes?: string;
}

export interface BookLogPostRequest {
  count: number;
  date: string | Moment;
  notes?: string;
}


export interface BookLogResponse extends BookLogRequest {
  id: number;
}

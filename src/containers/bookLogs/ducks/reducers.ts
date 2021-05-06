import { BookLogResponse, BookLogsReducerState } from './types';
import {
  ASYNC_REQUEST_FAILED_ACTION,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestNotStarted,
  generateAsyncRequestReducer,
} from '../../../utils/asyncRequest';
import { loadBookLogs } from './actions';
import { C4CAction } from '../../../store';

export const initialBookLogsState: BookLogsReducerState = {
  bookLogs: AsyncRequestNotStarted<BookLogResponse[], any>(),
};

const bookLogsReducer = generateAsyncRequestReducer<
  BookLogsReducerState,
  BookLogResponse[],
  void
>(loadBookLogs.key);

const reducers = (
  state: BookLogsReducerState = initialBookLogsState,
  action: C4CAction,
): BookLogsReducerState => {
  switch (action.type) {
    case ASYNC_REQUEST_LOADING_ACTION:
    case ASYNC_REQUEST_LOADED_ACTION:
    case ASYNC_REQUEST_FAILED_ACTION:
      return {
        ...state,
        bookLogs: bookLogsReducer(state.bookLogs, action),
      };
    default:
      return state;
  }
};

export default reducers;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { C4CState } from '../../store';
import { AsyncRequestKinds } from '../../utils/asyncRequest';
import { Button } from 'antd';
import {
  BookLogRequest,
  BookLogResponse,
  BookLogsReducerState,
} from './ducks/types';
import {
  createBookLog,
  deleteBookLog,
  getBookLogs,
  updateBookLog,
} from './ducks/thunks';
import BookLog from '../../components/bookLogs/BookLog';

const BookLogs: React.FC = () => {
  const dispatch = useDispatch();
  const schoolId = 1; // Will eventually fetch from store
  const bookLogs: BookLogsReducerState['bookLogs'] = useSelector(
    (state: C4CState) => state.bookLogsState.bookLogs,
  );
  const [showAddLog, setShowAddLog] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getBookLogs(schoolId));
  }, [schoolId]);

  const deleteLog = (bookLogId: number) => {
    dispatch(deleteBookLog(schoolId, bookLogId));
  };

  const renderExistingBookLog = (log: BookLogResponse): JSX.Element => {
    const submitCallback = (c: BookLogRequest): void => {
      dispatch(updateBookLog(schoolId, log.id, c));
    };
    return (
      <BookLog
        defaultBookLog={log}
        onSubmit={submitCallback}
        onDelete={() => deleteLog(log.id)}
        key={log.id}
      />
    );
  };

  const renderAddBookLog = (): JSX.Element => {
    const submitCallback = (c: BookLogRequest): void => {
      dispatch(createBookLog(schoolId, c));
      setShowAddLog(false);
    };
    return (
      <BookLog
        onSubmit={submitCallback}
        onCancel={() => setShowAddLog(false)}
      />
    );
  };

  switch (bookLogs.kind) {
    case AsyncRequestKinds.NotStarted:
    case AsyncRequestKinds.Loading:
      return <p>Loading book logs...</p>;
    case AsyncRequestKinds.Failed:
      return <p>Failed to load book logs</p>;
    case AsyncRequestKinds.Completed:
      return (
        <div>
          {bookLogs.result.map(renderExistingBookLog)}
          {!showAddLog && (
            <Button onClick={() => setShowAddLog(true)}>Add Book Log</Button>
          )}
          {showAddLog && renderAddBookLog()}
        </div>
      );
  }
};

export default BookLogs;

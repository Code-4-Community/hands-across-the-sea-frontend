import { Button } from 'antd';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import protectedApiClient from '../../api/protectedApiClient';
import BookLog from '../../components/bookLogs/BookLog';
import { BookLogRequest, BookLogResponse } from './types';

const BookLogs: React.FC = () => {
  const schoolId = 1; // Will eventually fetch from store
  const { isLoading, data, error } = useQuery<BookLogResponse[], Error>(
    ['bookLogs', schoolId],
    () => protectedApiClient.getBookLogs(schoolId),
  );
  const [showAddLog, setShowAddLog] = useState<boolean>(false);

  const deleteLog = async (bookLogId: number) => {
    return await protectedApiClient.deleteBookLog(schoolId, bookLogId);
  };

  const renderExistingBookLog = (log: BookLogResponse): JSX.Element => {
    const submitCallback = async (c: BookLogRequest): Promise<void> => {
      await protectedApiClient.updateBookLog(schoolId, log.id, c);
    };
    return (
      <BookLog
        defaultBookLog={log}
        onSubmit={submitCallback}
        onDelete={async () => await deleteLog(log.id)}
        key={log.id}
      />
    );
  };

  const renderAddBookLog = (): JSX.Element => {
    const submitCallback = async (c: BookLogRequest): Promise<void> => {
      await protectedApiClient.createBookLog(schoolId, c);
      setShowAddLog(false);
    };
    return (
      <BookLog
        onSubmit={submitCallback}
        onCancel={() => setShowAddLog(false)}
      />
    );
  };

  return (
    <>
      {isLoading && <p>Loading book logs...</p>}
      {error && <p>Failed to load book logs: {error.message}</p>}
      {data && (
        <>
          {data.map(renderExistingBookLog)}
          {!showAddLog && (
            <Button onClick={() => setShowAddLog(true)}>Add Book Log</Button>
          )}
          {showAddLog && renderAddBookLog()}
        </>
      )}
    </>
  );
};

export default BookLogs;

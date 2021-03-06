import React, { useEffect, useState } from 'react';
import { Container, Outer } from '../../components/form-style/FormContainer';
import { Button, Col, Input, Modal, Row, Table } from 'antd';
import { SchoolEntry } from '../selectSchool/ducks/types';
import { ColumnType } from 'antd/lib/table';
import { DirectoryTitle } from '../../components';
import CreateSchool from '../../components/schoolDirectory/CreateSchool';
import BookLogsMenu from '../../components/schoolDirectory/BookLogsMenu';
import { SchoolRequest } from '../schoolInfo/ducks/types';
import { useDispatch, useSelector } from 'react-redux';
import { createSchoolRequest } from '../schoolInfo/ducks/thunks';
import { loadSchools } from '../selectSchool/ducks/thunks';
import { AsyncRequest, AsyncRequestKinds } from '../../utils/asyncRequest';
import { C4CState } from '../../store';
import SchoolDirectoryActionMenu, {
  SchoolDirectoryAction,
} from '../../components/schoolDirectory/SchoolDirectoryActionMenu';
import { deleteSchool } from './ducks/thunks';

import {
  createBookLog,
  deleteBookLog,
  getBookLogs,
  updateBookLog,
} from '../bookLogs/ducks/thunks';
import { BookLogRequest, BookLogPostRequest } from '../bookLogs/ducks/types';
import EditBookLog from '../../components/schoolDirectory/EditBookLog';
import moment from 'moment';

import { Countries } from '../../utils/countries';

const { Search } = Input;

interface BookLogsSchoolInfo {
  readonly id: number;
  readonly name: string;
}

const SchoolDirectory: React.FC = () => {
  const [createSchool, setCreateSchool] = useState<boolean>(false);
  const [updateSchoolList, setUpdateSchoolList] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  const [bookLogs, setBookLogs] = useState<boolean>(false);
  const [bookLogsSchool, setBookLogsSchool] = useState<BookLogsSchoolInfo>({
    id: -1,
    name: '',
  });
  const [bookLogsList, setBookLogsList] = useState<BookLogRequest[]>([]);
  const [added, setAdded] = useState<number>(0);
  const [deletedLogs, setDeletedLogs] = useState<number[]>([]);

  const [editBookLogs, setEditBookLogs] = useState<boolean>(false);
  const [editedBookLog, setEditedBookLog] = useState<BookLogRequest>({
    count: 0,
    date: '',
    id: -1,
  });

  const dispatch = useDispatch();
  const availableSchools: AsyncRequest<SchoolEntry[], any> = useSelector(
    (state: C4CState) => state.selectSchoolState.schools,
  );

  // need useEffect inside of component because the state "updateSchoolList"
  // needs to be a dependency
  useEffect(() => {
    dispatch(loadSchools());
  }, [dispatch, updateSchoolList]);

  // handles submitting create a school form
  const handleOnFinishCreateSchool = (schoolInfo: SchoolRequest) => {
    dispatch(createSchoolRequest(schoolInfo));
    setCreateSchool(false);
    setUpdateSchoolList(!updateSchoolList);
  };

  // handles canceling the create school form
  const handleOnCancelCreateSchool = () => {
    setCreateSchool(false);
  };

  // handles the button click of Create School button
  const handleOnClickCreateSchool = () => {
    setCreateSchool(!createSchool);
  };

  // handles saving the book logs - posts all of the newly added book logs to the backend
  // and also deletes all of the deleted book logs
  const handleOnSaveBookLogs = () => {
    for (const bookLog of bookLogsList) {
      const logValue: BookLogPostRequest = {
        count: bookLog.count,
        date: moment(bookLog.date),
        notes: bookLog.notes,
      };
      dispatch(createBookLog(bookLogsSchool.id, logValue));
    }
    for (const deletedLog of deletedLogs) {
      dispatch(deleteBookLog(bookLogsSchool.id, deletedLog));
    }
    setBookLogs(false);
    setBookLogsSchool({ id: -1, name: '' });
    setBookLogsList([]);
    setDeletedLogs([]);
    setAdded(0);
  };

  // handles canceling the book log popover
  const handleOnCancelBookLogs = () => {
    setBookLogs(false);
    setBookLogsSchool({ id: -1, name: '' });
    setBookLogsList([]);
    setDeletedLogs([]);
    setAdded(0);
  };

  // handles adding a new book to the log
  const handleAddBookLog = (bookLog: BookLogRequest) => {
    if (!bookLog.date) {
      bookLog.date = moment(new Date().toString());
    }
    // for the newly added booklogs, the id is set to a negative value so that
    // the component can access them for editing/deleting. since this value will be
    // 0 - added, none of the new book log ids will be the same. this is also ignored when posting the
    // log to the backend.
    bookLog.id = 0 - added;
    setBookLogsList([bookLog, ...bookLogsList]);
    setAdded(added + 1);
  };

  // handles opening the edit book log popup
  const handleOnEditBookLog = (bookLog: BookLogRequest) => {
    setBookLogs(false);
    bookLog.date = moment(bookLog.date);
    setEditedBookLog(bookLog);
    setEditBookLogs(true);
  };

  // handles closing the edit book log popup
  const handleOnCancelEditBookLogs = () => {
    setEditBookLogs(false);
    setEditedBookLog({ id: -1, count: 0, date: '' });
    setBookLogs(true);
  };

  // handles deleting a book from the log
  const handleOnDeleteBookLog = (id: number) => {
    if (id > 0) {
      setDeletedLogs([id, ...deletedLogs]);
    } else {
      setAdded(added - 1);
      setBookLogsList(bookLogsList.filter((log) => log.id !== id));
    }
  };

  // handles saving the updates to a book log
  const handleOnSaveEditBookLogs = (bookLog: BookLogRequest) => {
    if (editedBookLog.id > 0) {
      dispatch(updateBookLog(bookLogsSchool.id, editedBookLog.id, bookLog));
    } else {
      bookLog.id = editedBookLog.id;
      const editedBookLogs = bookLogsList.map((log) => {
        return log.id === editedBookLog.id ? bookLog : log;
      });
      setBookLogsList(editedBookLogs);
    }
    setEditBookLogs(false);
    setEditedBookLog({ id: -1, count: 0, date: '' });
    setBookLogs(true);
  };

  // handles determining what action to do when an action is executed
  const handleActionButtonOnClick = (schoolId: number, schoolName: string) => (
    key: SchoolDirectoryAction,
  ) => {
    switch (key) {
      case SchoolDirectoryAction.EDIT:
        return;
      case SchoolDirectoryAction.BOOKS:
        dispatch(getBookLogs(schoolId));

        const school: BookLogsSchoolInfo = {
          id: schoolId,
          name: schoolName,
        };
        setBookLogsSchool(school);
        setBookLogs(!bookLogs);

        return;
      case SchoolDirectoryAction.DELETE:
        dispatch(deleteSchool(schoolId));
        setUpdateSchoolList(!updateSchoolList);
    }
  };

  const columns: ColumnType<SchoolEntry>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'id',
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 1,
      },
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'id',
      sorter: {
        compare: (a, b) => a.country.localeCompare(b.country),
        multiple: 1,
      },
      render(country: keyof typeof Countries) {
        return <>{Countries[country]}</>;
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render(record: SchoolEntry) {
        return (
          <SchoolDirectoryActionMenu
            onAction={handleActionButtonOnClick(record.id, record.name)}
          />
        );
      },
    },
  ];

  switch (availableSchools.kind) {
    case AsyncRequestKinds.NotStarted:
    case AsyncRequestKinds.Failed:
      return <p>An error occurred loading schools</p>;
    case AsyncRequestKinds.Loading:
    case AsyncRequestKinds.Completed:
      return (
        <Container>
          <Modal
            visible={createSchool}
            width={1000}
            footer={null}
            destroyOnClose={true}
            onCancel={handleOnCancelCreateSchool}
          >
            <CreateSchool
              onFinish={handleOnFinishCreateSchool}
              onCancel={handleOnCancelCreateSchool}
            />
          </Modal>
          <Modal
            visible={bookLogs}
            width={1000}
            footer={null}
            destroyOnClose
            onCancel={handleOnCancelBookLogs}
          >
            <BookLogsMenu
              onAddBook={handleAddBookLog}
              onSave={handleOnSaveBookLogs}
              onEdit={handleOnEditBookLog}
              onDelete={handleOnDeleteBookLog}
              onCancel={handleOnCancelBookLogs}
              schoolName={bookLogsSchool?.name || ''}
              addedBookLogs={[...bookLogsList]}
              added={added}
              deletedLogs={deletedLogs}
            />
          </Modal>
          <Modal
            visible={editBookLogs}
            width={1000}
            footer={null}
            destroyOnClose
            onCancel={handleOnCancelEditBookLogs}
          >
            <EditBookLog
              onSave={handleOnSaveEditBookLogs}
              onCancel={handleOnCancelEditBookLogs}
              bookLog={editedBookLog}
              schoolName={bookLogsSchool?.name || ''}
            />
          </Modal>
          <Row gutter={[0, 32]}>
            <Col flex={24}>
              <DirectoryTitle level={2}>School Directory</DirectoryTitle>
            </Col>
          </Row>
          <Row gutter={[48, 32]}>
            <Col flex={18}>
              <Search onChange={(e) => setSearchText(e.target.value)} />
            </Col>
            <Col flex={6}>
              <Button onClick={handleOnClickCreateSchool}>Add School</Button>
            </Col>
          </Row>
          <Outer>
            <Table
              dataSource={
                availableSchools.kind === AsyncRequestKinds.Completed
                  ? availableSchools.result.filter((entry) =>
                      entry.name
                        .toLocaleLowerCase()
                        .startsWith(searchText.toLowerCase()),
                    )
                  : undefined
              }
              columns={columns}
              loading={availableSchools.kind === AsyncRequestKinds.Loading}
            />
          </Outer>
        </Container>
      );
  }
};

export default SchoolDirectory;

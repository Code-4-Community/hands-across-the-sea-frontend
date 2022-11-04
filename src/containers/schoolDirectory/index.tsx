import { Button, Col, Input, message, Modal, Row, Select, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import moment from 'moment';
import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import protectedApiClient from '../../api/protectedApiClient';
import { DirectoryTitle } from '../../components';
import { Container, Outer } from '../../components/form-style/FormContainer';
import BookLogsMenu from '../../components/schoolDirectory/BookLogsMenu';
import CreateSchool from '../../components/schoolDirectory/CreateSchool';
import EditBookLog from '../../components/schoolDirectory/EditBookLog';
import SchoolDirectoryActionMenu, {
  SchoolDirectoryAction,
} from '../../components/schoolDirectory/SchoolDirectoryActionMenu';
import { Countries } from '../../utils/countries';
import { BookLogPostRequest, BookLogRequest } from '../bookLogs/types';
import { SchoolRequest, SchoolResponse } from '../schoolInfo/types';
import { SchoolEntry } from '../selectSchool/ducks/types';
import BackButton from '../../components/BackButton';
import styled from 'styled-components';

const { Search } = Input;

interface BookLogsSchoolInfo {
  readonly id: number;
  readonly name: string;
}

const CountryFilter = styled(Select)`
  min-width: 200px;
`;

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

  const [updateSchool, setUpdateSchool] = useState<boolean>(false);
  const [updatedSchool, setUpdatedSchool] = useState<
    SchoolResponse | undefined
  >(undefined);

  const queryClient = useQueryClient();
  const { isLoading, error, data, refetch, isRefetching } = useQuery(
    'schools',
    protectedApiClient.getAllSchools,
  );

  // handles selecting a country to filter
  const handleCountryFilter = async (value: any) => {
    return;
  };

  // handles submitting create a school form
  const handleOnFinishCreateSchool = async (
    schoolInfo: SchoolRequest,
    schoolId: number,
  ) => {
    try {
      if (updateSchool) {
        await protectedApiClient.updateSchool(schoolId, schoolInfo);
        setUpdateSchool(false);
        setUpdatedSchool(undefined);
      } else {
        await protectedApiClient.createSchool(schoolInfo);
        setCreateSchool(false);
        setUpdateSchoolList(!updateSchoolList);
      }
      queryClient.invalidateQueries('schools');
    } catch (err) {
      message.error(`An error occurred, please try again.`);
    }
  };

  // handles canceling the create school form
  const handleOnCancelCreateSchool = () => {
    setCreateSchool(false);
    setUpdateSchool(false);
    setUpdatedSchool(undefined);
  };

  // handles the button click of Create School button
  const handleOnClickCreateSchool = () => {
    setCreateSchool(!createSchool);
  };

  // handles saving the book logs - posts all of the newly added book logs to the backend
  // and also deletes all of the deleted book logs
  const handleOnSaveBookLogs = async () => {
    await Promise.all(
      bookLogsList.map(async (bookLog) => {
        const logValue: BookLogPostRequest = {
          count: bookLog.count,
          date: moment(bookLog.date),
          notes: bookLog.notes,
        };
        return await protectedApiClient.createBookLog(
          bookLogsSchool.id,
          logValue,
        );
      }),
    );

    await Promise.all(
      deletedLogs.map(async (logId) => {
        await protectedApiClient.deleteBookLog(bookLogsSchool.id, logId);
      }),
    );
    queryClient.invalidateQueries(['bookLogs', bookLogsSchool.id]);

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
  const handleOnSaveEditBookLogs = async (bookLog: BookLogRequest) => {
    if (editedBookLog.id > 0) {
      await protectedApiClient.updateBookLog(
        bookLogsSchool.id,
        editedBookLog.id,
        bookLog,
      );
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
  const handleActionButtonOnClick =
    (school: SchoolEntry) => async (key: SchoolDirectoryAction) => {
      if (key === SchoolDirectoryAction.EDIT) {
        try {
          const schoolResponse = await protectedApiClient.getSchool(school.id);
          setUpdatedSchool(schoolResponse);
          setUpdateSchool(true);
        } catch (err) {
          message.error(`An error occurred, please try again`);
        }
      } else if (key === SchoolDirectoryAction.DELETE) {
        if (
          window.confirm(
            `Are you sure you want to delete this school (${school.name})?`,
          )
        ) {
          await protectedApiClient.deleteSchool(school.id);
          setUpdateSchoolList(!updateSchoolList);
          await refetch();
        }
      } else if (key === SchoolDirectoryAction.BOOKS) {
        queryClient.invalidateQueries(['bookLogs', school.id]);
        setBookLogsSchool({
          id: school.id,
          name: school.name,
        });
        setBookLogs(!bookLogs);
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
            onAction={handleActionButtonOnClick(record)}
          />
        );
      },
    },
  ];

  return (
    <>
      {error && <p>An error occurred loading schools</p>}
      {!error && (
        <Container>
          <BackButton />
          <Modal
            visible={createSchool || updateSchool}
            width={1000}
            footer={null}
            destroyOnClose={true}
            onCancel={handleOnCancelCreateSchool}
          >
            <CreateSchool
              onFinish={handleOnFinishCreateSchool}
              onCancel={handleOnCancelCreateSchool}
              update={updateSchool}
              defaultSchool={updatedSchool}
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
              schoolId={bookLogsSchool.id}
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
          <Row gutter={[0, 32]}>
            <Col flex={18}>
              <Search onChange={(e) => setSearchText(e.target.value)} />
            </Col>
            <Col flex={3}>
              <CountryFilter
                onChange={handleCountryFilter}
                placeholder="Country To Filter"
                defaultValue=""
              >
                <Select.Option value="">All Countries</Select.Option>
                {Object.keys(Countries).map((key: string) => (
                  <Select.Option key={key} value={key}>
                    {Countries[key as keyof typeof Countries]}
                  </Select.Option>
                ))}
              </CountryFilter>
            </Col>
            <Col flex={3}>
              <Button onClick={handleOnClickCreateSchool}>Add School</Button>
            </Col>
          </Row>
        <br/>
          <Outer>
            <Table
              dataSource={
                data
                  ? data
                      .sort((s1, s2) => s1.id - s2.id)
                      .filter((entry) =>
                        entry.name
                          .toLocaleLowerCase()
                          .startsWith(searchText.toLowerCase()),
                      )
                  : undefined
              }
              columns={columns}
              loading={isLoading || isRefetching}
            />
          </Outer>
        </Container>
      )}
    </>
  );
};

export default SchoolDirectory;

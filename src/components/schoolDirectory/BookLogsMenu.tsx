import { Button, Col, DatePicker, Form, InputNumber, Row, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import moment from 'moment';
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { DirectoryTitle, FormTextArea } from '../';
import protectedApiClient from '../../api/protectedApiClient';
import bookLogs from '../../containers/bookLogs';
import {
  BookLogRequest,
  BookLogResponse,
} from '../../containers/bookLogs/types';
import FormPiece from '../form-style/FormPiece';

interface BookLogWithStyling extends BookLogRequest {
  style: string;
}

interface BookLogsMenuProps {
  readonly schoolId: number;
  readonly onSave: () => void;
  readonly onCancel: () => void;
  readonly onEdit: (bookLog: BookLogRequest) => void;
  readonly onDelete: (id: number) => void;
  readonly schoolName: string;
  readonly onAddBook: (bookLogRequest: BookLogRequest) => void;
  readonly added: number;
  readonly addedBookLogs: BookLogRequest[];
  readonly deletedLogs: number[];
}
const Footer = styled.div`
  text-align: center;
  margin: 24px 0px 0px 0px;
`;
const SubmitButton = styled(Button)`
  width: 200px;
`;

export const InlineInputNumber = styled(InputNumber)`
  width: 420px;
`;
export const InlineDatePicker = styled(DatePicker)`
  width: 420px;
`;
export const InlineFormContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AddBookButton = styled(SubmitButton)`
  background: #294186;
  border-radius: 92px;
  color: white;
  margin: 0 auto;
  margin-left: 38%;
  width: 24%;
  height: 42px;
`;

export const CancelButton = styled(SubmitButton)`
  background: #fff;
  border-radius: 92px;
  color: #294186;
  border: 2px solid #294186;
  height: 42px;
  margin-right: 20px;
`;

export const SaveButton = styled(SubmitButton)`
  background: #294186;
  border-radius: 34px;
  color: white;
  height: 42px;
  margin-left: 20px;
`;

const BookLogsMenu: React.FC<BookLogsMenuProps> = ({
  schoolId,
  onSave,
  onCancel,
  onEdit,
  onDelete,
  schoolName,
  onAddBook,
  added,
  addedBookLogs,
  deletedLogs,
}) => {
  const { isLoading, error, data } = useQuery<BookLogResponse[], Error>(
    ['bookLogs', schoolId],
    () => protectedApiClient.getBookLogs(schoolId),
  );

  const columns: ColumnType<BookLogWithStyling>[] = [
    {
      title: 'Book Amount',
      dataIndex: 'count',
      sorter: {
        compare: (a, b) => a.count - b.count,
        multiple: 1,
      },
      render(text, log) {
        return {
          props: {
            style: { background: log.style },
          },
          children: <div>{text}</div>,
        };
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      sorter: {
        compare: (a, b) =>
          new Date(a.date.toString()).getTime() -
          new Date(b.date.toString()).getTime(),
        multiple: 1,
      },
      render(text, log) {
        return {
          props: {
            style: { background: log.style },
          },
          children: <div>{new Date(text.toString()).toLocaleDateString()}</div>,
        };
      },
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      render(text, log) {
        return {
          props: {
            style: { background: log.style },
          },
          children: <div>{text}</div>,
        };
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      render(_, log: BookLogWithStyling) {
        return {
          props: {
            style: { background: log.style },
          },
          children: (
            <div>
              <Button
                type="link"
                onClick={() => {
                  onDelete(log.id);
                }}
              >
                Delete
              </Button>
              |{' '}
              <Button
                type="link"
                onClick={() => {
                  onEdit(log);
                }}
              >
                Edit
              </Button>
            </div>
          ),
        };
      },
    },
  ];

  return (
    <>
      {isLoading && <p>Loading book logs...</p>}
      {error && <p>Error loading book logs</p>}
      {data && (
        <div>
          <Row gutter={[0, 32]}>
            <Col flex={24}>
              <DirectoryTitle level={2}>
                Book Logs for {schoolName}
              </DirectoryTitle>
            </Col>
          </Row>
          <Form onFinish={onAddBook}>
            <Row gutter={[0, 24]}>
              <Col flex={24}>
                <FormPiece titleLevel={4} note="Enter New Book Log">
                  <InlineFormContainer>
                    <Form.Item name="count">
                      <InlineInputNumber
                        required={true}
                        placeholder="Book Amount Change"
                      />
                    </Form.Item>
                    <Form.Item required name="date">
                      <InlineDatePicker
                        placeholder="Select Date"
                        defaultValue={moment(new Date().toString())}
                      />
                    </Form.Item>
                  </InlineFormContainer>
                  <Form.Item name="notes">
                    <FormTextArea placeholder="Notes" />
                  </Form.Item>
                  <AddBookButton htmlType={'submit'}>Add</AddBookButton>
                </FormPiece>
              </Col>
            </Row>
          </Form>
          <Row gutter={[0, 24]}>
            <Col flex={24}>
              <FormPiece titleLevel={4} note="Past Book Logs">
                <Table
                  dataSource={addedBookLogs
                    .concat(data.filter((log) => !deletedLogs.includes(log.id)))
                    .map((log, ind) => {
                      const styledLog: BookLogWithStyling = {
                        count: log.count,
                        date: log.date,
                        id: log.id,
                        notes: log.notes,
                        style: ind > added - 1 ? '#fff' : '#E6F7FF',
                      };
                      return styledLog;
                    })}
                  columns={columns}
                  pagination={{ pageSize: 7 }}
                />
              </FormPiece>
            </Col>
          </Row>
          <Footer>
            <Row gutter={[0, 24]}>
              <Col flex={24}>
                <CancelButton onClick={onCancel}>Cancel</CancelButton>
                <SaveButton onClick={onSave}>Save</SaveButton>
              </Col>
            </Row>
          </Footer>
        </div>
      )}
    </>
  );
};

export default BookLogsMenu;

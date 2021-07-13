import React from 'react';
import { Button, Col, Form, Row, InputNumber, DatePicker, Table } from 'antd';
import { FormTextArea } from '../';
import FormPiece from '../form-style/FormPiece';
import styled from 'styled-components';
import { DirectoryTitle } from '../';
import { BookLogRequest } from '../../containers/bookLogs/ducks/types';
import { ColumnType } from 'antd/lib/table';
import { AsyncRequest, AsyncRequestKinds } from '../../utils/asyncRequest';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { C4CState } from '../../store';

interface BookLogWithStyling extends BookLogRequest {
  style: string;
}

interface BookLogsMenuProps {
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
  const currentBookLogs: AsyncRequest<BookLogRequest[], any> = useSelector(
    (state: C4CState) => state.bookLogsState.bookLogs,
  );

  const columns: ColumnType<BookLogWithStyling>[] = [
    {
      title: 'Book Amount',
      dataIndex: 'count',
      key: 'id',
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
      key: 'id',
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
      key: 'id',
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
      key: 'x',
      render(_, log: BookLogWithStyling, ind: number) {
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

  switch (currentBookLogs.kind) {
    case AsyncRequestKinds.NotStarted:
    case AsyncRequestKinds.Failed:
      return <p>An error occurred loading schools</p>;
    case AsyncRequestKinds.Loading:
      return <p>Loading book logs</p>;
    case AsyncRequestKinds.Completed:
      const filteredCurrentBookLogs: BookLogRequest[] = currentBookLogs.result.filter(
        (log) => !deletedLogs.includes(log.id),
      );

      // this will set the highlight for the newly added book logs
      const allBookLogs: BookLogWithStyling[] = addedBookLogs
        .concat(filteredCurrentBookLogs)
        .map((log, ind) => {
          const styledLog: BookLogWithStyling = {
            count: log.count,
            date: log.date,
            id: log.id,
            notes: log.notes,
            style: ind > added - 1 ? '#fff' : '#E6F7FF',
          };
          return styledLog;
        });

      return (
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
                  dataSource={allBookLogs}
                  columns={columns}
                  pagination={{ pageSize: 7 }}
                />
              </FormPiece>
            </Col>
          </Row>
          <Footer>
            <Row gutter={[0, 24]}>
              <Col flex={24}>
                <CancelButton
                  onClick={() => {
                    onCancel();
                  }}
                >
                  Cancel
                </CancelButton>
                <SaveButton
                  onClick={() => {
                    onSave();
                  }}
                >
                  Save
                </SaveButton>
              </Col>
            </Row>
          </Footer>
        </div>
      );
  }
};

export default BookLogsMenu;

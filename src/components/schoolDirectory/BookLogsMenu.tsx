import {
  Button,
  Col,
  DatePicker,
  Form,
  InputNumber,
  Row,
  Table,
  Typography,
} from 'antd';
import React from 'react';
import { DirectoryTitle, FormTextArea } from '../';
import FormPiece from '../form-style/FormPiece';
import styled from 'styled-components';
import { ColumnType } from 'antd/lib/table';
import moment from 'moment';
import { useQuery } from 'react-query';
import protectedApiClient from '../../api/protectedApiClient';
import {
  BookLogRequest,
  BookLogResponse,
} from '../../containers/bookLogs/types';
import getColorPalette from '../../utils/colors';

const { Title } = Typography;

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

const TotalBooksDisplay = styled(Title)`
  text-align: left;
  margin-left: 45px;
  padding: 12px;
`;

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
  background: ${getColorPalette().primary};
  border-radius: 92px;
  color: ${getColorPalette().lightText};
  margin: 0 auto;
  margin-left: 38%;
  width: 24%;
  height: 42px;
`;

export const CancelButton = styled(SubmitButton)`
  background: ${getColorPalette().lightText};
  border-radius: 92px;
  color: ${getColorPalette().primary};
  border: 2px solid ${getColorPalette().primary};
  height: 42px;
  margin-right: 20px;
`;

export const SaveButton = styled(SubmitButton)`
  background: ${getColorPalette().primary};
  border-radius: 34px;
  color: ${getColorPalette().lightText};
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

  const createDataSource = (results: BookLogRequest[]) => {
    return addedBookLogs
      .concat(results.filter((log) => !deletedLogs.includes(log.id)))
      .map((log, ind) => {
        const styledLog: BookLogWithStyling = {
          count: log.count,
          date: log.date,
          id: log.id,
          notes: log.notes,
          style:
            ind > added - 1
              ? getColorPalette().background
              : getColorPalette().tertiary,
        };
        return styledLog;
      });
  };

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
                  dataSource={createDataSource(data)}
                  columns={columns}
                  pagination={{ pageSize: 7 }}
                />
              </FormPiece>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <TotalBooksDisplay level={4}>
                Total Books:{' '}
                {createDataSource(data).reduce(
                  (sum, elem) => sum + elem.count,
                  0,
                )}
              </TotalBooksDisplay>
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

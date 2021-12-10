import React, { useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import moment from 'moment';
import {
  BookLogRequest,
  BookLogResponse,
} from '../../containers/bookLogs/types';

interface BookLogProps {
  defaultBookLog?: BookLogResponse;
  onSubmit: (c: BookLogRequest) => Promise<void>;
  onDelete?: () => Promise<void>;
  onCancel?: () => void;
}

const BookLog: React.FC<BookLogProps> = ({
  defaultBookLog,
  onSubmit,
  onDelete,
  onCancel,
}) => {
  const initialBookLog =
    defaultBookLog ||
    ({
      count: 0,
      date: new Date().toISOString(),
      notes: undefined,
    } as BookLogRequest);
  const [bookLog, setBookLog] = useState<BookLogRequest>(initialBookLog);
  const [editMode, setEditMode] = useState<boolean>(!defaultBookLog);

  const onSubmitHandler = async (c: BookLogRequest) => {
    await onSubmit(c);
    setBookLog(c);
    setEditMode(false);
  };

  const onCancelHandler = () => {
    if (defaultBookLog) {
      setEditMode(false);
    } else if (onCancel !== undefined) {
      onCancel();
    }
  };

  if (editMode) {
    return (
      <EditBookLog
        initialBookLog={bookLog}
        onSubmit={onSubmitHandler}
        onCancel={onCancelHandler}
      />
    );
  } else {
    return (
      <div>
        <Row gutter={[24, 0]}>
          <Col flex={12}>{bookLog.count}</Col>
        </Row>
        <Row gutter={[24, 0]}>
          <Col flex={12}>{bookLog.notes}</Col>
        </Row>
        <Row gutter={[24, 0]}>
          <Col flex={12}>{bookLog.date}</Col>
        </Row>
        <Button onClick={() => setEditMode(true)}>Edit</Button>
        <Button onClick={onDelete}>Delete</Button>
      </div>
    );
  }
};

interface EditBookLogProps {
  initialBookLog: BookLogRequest;
  onSubmit: (c: BookLogRequest) => Promise<void>;
  onCancel: () => void;
}

/**
 * For a book log form, the date must be represented as a Moment object rather than a string.
 */
type BookLogForm = Omit<BookLogRequest, 'date'> & {
  date: moment.Moment;
};

const EditBookLog: React.FC<EditBookLogProps> = ({
  initialBookLog,
  onSubmit,
  onCancel,
}) => {
  const initialValues: BookLogForm = {
    ...initialBookLog,
    date: moment(initialBookLog.date),
  };

  const onSubmitHandler = async (values: BookLogForm) => {
    await onSubmit({
      ...values,
      date: values.date.toISOString(),
    });
  };

  return (
    <Form
      initialValues={initialValues}
      name="book-log"
      onFinish={onSubmitHandler}
    >
      <Row gutter={[24, 0]}>
        <Col flex={12}>
          <Form.Item name="count">
            <Input placeholder="Number of books" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[24, 0]}>
        <Col flex={12}>
          <Form.Item name="notes">
            <Input placeholder="Notes" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="type">
        <Col flex={12}>
          <Form.Item name="date">
            <DatePicker />
          </Form.Item>
        </Col>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button type="default" onClick={onCancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BookLog;

import React, { useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import {
  BookLogRequest,
  BookLogResponse,
} from '../../containers/bookLogs/ducks/types';

interface BookLogProps {
  defaultBookLog?: BookLogResponse;
  onSubmit: (c: BookLogRequest) => void;
  onDelete?: () => void;
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
      date: '',
      notes: '',
    } as BookLogRequest);
  const [bookLog, setBookLog] = useState<BookLogRequest>(initialBookLog);
  const [editMode, setEditMode] = useState<boolean>(!defaultBookLog);

  const onSubmitHandler = (c: BookLogRequest) => {
    onSubmit(c);
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
  onSubmit: (c: BookLogRequest) => void;
  onCancel: () => void;
}
const EditBookLog: React.FC<EditBookLogProps> = ({
  initialBookLog,
  onSubmit,
  onCancel,
}) => {
  return (
    <Form initialValues={initialBookLog} name="book-log" onFinish={onSubmit}>
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

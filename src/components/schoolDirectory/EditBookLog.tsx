import React from 'react';
import { Col, Form, Row } from 'antd';
import { FormTextArea } from '../';
import FormPiece from '../form-style/FormPiece';
import styled from 'styled-components';
import { BookLogRequest } from '../../containers/bookLogs/ducks/types';
import {
  InlineFormContainer,
  InlineInputNumber,
  InlineDatePicker,
  CancelButton,
  SaveButton,
} from './BookLogsMenu';
import { DirectoryTitle } from '../';

interface EditBookLogProps {
  readonly onSave: (bookLogRequest: BookLogRequest) => void;
  readonly onCancel: () => void;
  readonly bookLog: BookLogRequest;
  readonly schoolName: string;
}

const Footer = styled.div`
  text-align: center;
  margin: 24px 0px 0px 0px;
`;

const EditBookLog: React.FC<EditBookLogProps> = ({
  onSave,
  onCancel,
  bookLog,
  schoolName,
}) => {
  return (
    <div>
      <Row gutter={[0, 32]}>
        <Col flex={24}>
          <DirectoryTitle level={2}>Book Logs for {schoolName}</DirectoryTitle>
        </Col>
      </Row>
      <Form onFinish={onSave} initialValues={bookLog}>
        <Row gutter={[0, 24]}>
          <Col flex={24}>
            <FormPiece titleLevel={4} note="Editing Book Log">
              <InlineFormContainer>
                <Form.Item name="count">
                  <InlineInputNumber
                    required
                    placeholder="Book Amount Change"
                  />
                </Form.Item>
                <Form.Item name="date">
                  <InlineDatePicker placeholder="Select Date" />
                </Form.Item>
              </InlineFormContainer>
              <Form.Item name="notes">
                <FormTextArea placeholder="Notes" />
              </Form.Item>
            </FormPiece>
          </Col>
        </Row>
        <Footer>
          <Row gutter={[0, 24]}>
            <Col flex={24}>
              <CancelButton onClick={onCancel}>Cancel</CancelButton>
              <SaveButton htmlType={'submit'}>Save</SaveButton>
            </Col>
          </Row>
        </Footer>
      </Form>
    </div>
  );
};

export default EditBookLog;

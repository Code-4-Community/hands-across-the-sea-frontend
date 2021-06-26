import { Col, Form, Row } from 'antd';
import React from 'react';
import FormContainer from '../form-style/FormContainer';
import FormPiece from '../form-style/FormPiece';
import { FormTextArea } from '../index';

const ChangesActionPlan: React.FC = () => {
  return (
    <FormContainer title="Changes and Action Plan">
      <Row>
        <Col flex={24}>
          <FormPiece note="Action Plans">
            <Form.Item
              name="actionPlan"
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <FormTextArea placeholder="Please enter your answer here" />
            </Form.Item>
          </FormPiece>
          <FormPiece note="Success Stories?">
            <Form.Item
              name="successStories"
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <FormTextArea placeholder="Please enter your answer here" />
            </Form.Item>
          </FormPiece>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default ChangesActionPlan;

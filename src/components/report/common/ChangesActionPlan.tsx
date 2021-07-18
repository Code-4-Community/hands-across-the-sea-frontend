import { Col, Form, Row } from 'antd';
import React from 'react';
import FormContainer from '../../form-style/FormContainer';
import FormPiece from '../../form-style/FormPiece';
import { FormTextArea } from '../../index';
import FormText from '../../form-style/FormText';

interface ChangesActionPlanProps {
  editable?: boolean;
}

const ChangesActionPlan: React.FC<ChangesActionPlanProps> = ({ editable }) => {
  return (
    <FormContainer title="Changes and Action Plan">
      <Row>
        <Col flex={24}>
          <FormPiece note="Action Plans">
            <Form.Item name="actionPlan">
              {editable ? (
                <FormTextArea placeholder="Please enter your answer here" />
              ) : (
                <FormText />
              )}
            </Form.Item>
          </FormPiece>
          <FormPiece note="Success Stories?">
            <Form.Item name="successStories">
              {editable ? (
                <FormTextArea placeholder="Please enter your answer here" />
              ) : (
                <FormText />
              )}
            </Form.Item>
          </FormPiece>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default ChangesActionPlan;

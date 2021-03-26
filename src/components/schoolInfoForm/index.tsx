import React from 'react';
import { Col, Form, Input, Row } from 'antd';
import { FormTextArea } from '../';
import FormContainer from '../form-style/FormContainer';
import FormPiece from '../form-style/FormPiece';
import { SchoolRequest } from '../../containers/schoolInfo/ducks/types';

interface SchoolInformationFormProps {
  readonly onFinish: (schoolInfoRequest: SchoolRequest) => void;
}

const SchoolInformationForm: React.FC<SchoolInformationFormProps> = ({
  onFinish,
}) => (
  <Form onFinish={onFinish}>
    <FormContainer title="School Information">
      <Row gutter={[0, 24]}>
        <Col flex={24}>
          <FormPiece note="School Address">
            <Form.Item name="schoolStreetAddress">
              <Input placeholder="Street Address" />
            </Form.Item>
            <Form.Item name="schoolArea">
              <Input placeholder="Town or District" />
            </Form.Item>
            <Form.Item name="schoolInstructions">
              <FormTextArea
                minLength={2}
                placeholder="Any Specific Instructions?"
              />
            </Form.Item>
          </FormPiece>
        </Col>
      </Row>
    </FormContainer>
  </Form>
);

export default SchoolInformationForm;
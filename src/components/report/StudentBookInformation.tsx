import React from 'react';
import { Col, Form, InputNumber, Row } from 'antd';
import FormContainer from '../../components/form-style/FormContainer';
import FormPiece from '../../components/form-style/FormPiece';

const StudentBookInformation: React.FC = () => {
  return (
    <FormContainer title="Student and Book Information">
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <FormPiece note="How Many Children attended?">
            <Form.Item name="numberOfChildren">
              <InputNumber placeholder="#" min={0} />
            </Form.Item>
          </FormPiece>
        </Col>
        <Col span={12}>
          <FormPiece note="How Many Books?">
            <Form.Item name="numberOfBooks">
              <InputNumber placeholder="#" min={0} />
            </Form.Item>
          </FormPiece>
        </Col>
      </Row>
      <Row gutter={[24, 0]}>
        <Col span={12}>
          <FormPiece note="What grades attended?">
            <Form.Item name="gradesAttended">
              <InputNumber placeholder="#" min={0} />
            </Form.Item>
          </FormPiece>
        </Col>
        <Col span={12}>
          <FormPiece note="Most recent shipment year?">
            <Form.Item name="mostRecentShipmentYear">
              <InputNumber placeholder="#" min={0} />
            </Form.Item>
          </FormPiece>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default StudentBookInformation;

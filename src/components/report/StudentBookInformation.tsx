import React from 'react';
import { Col, Form, InputNumber, Row, Checkbox } from 'antd';
import FormContainer from '../../components/form-style/FormContainer';
import FormPiece from '../../components/form-style/FormPiece';
import styled from 'styled-components';

const InputNumberNoArrows = styled(InputNumber)`
  .ant-input-number-handler-wrap {
    display: none;
  }
`;

const StudentBookInformation: React.FC = () => {
  const gradeOptions = [
    '1st Grade',
    '2nd Grade',
    '3rd Grade',
    '4th Grade',
    '5th Grade',
    '6th Grade',
    '7th Grade',
    '9th Grade',
    '10th Grade',
    '11th Grade',
    '12th Grade',
  ];

  return (
    <FormContainer title="Student and Book Information">
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <FormPiece note="How Many Children attended?">
            <Form.Item name="numberOfChildren">
              <InputNumberNoArrows placeholder="#" min={0} />
            </Form.Item>
          </FormPiece>
        </Col>
        <Col span={12}>
          <FormPiece note="How Many Books?">
            <Form.Item name="numberOfBooks">
              <InputNumberNoArrows placeholder="#" min={0} />
            </Form.Item>
          </FormPiece>
        </Col>
      </Row>
      <Row gutter={[24, 0]}>
        <Col span={12}>
          <FormPiece note="What grades attended?">
            <Form.Item name="gradesAttended">
              <Checkbox.Group options={gradeOptions} />
            </Form.Item>
          </FormPiece>
        </Col>
        <Col span={12}>
          <FormPiece note="Most recent shipment year?">
            <Form.Item name="mostRecentShipmentYear">
              <InputNumberNoArrows placeholder="#" min={0} />
            </Form.Item>
          </FormPiece>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default StudentBookInformation;

import React from 'react';
import { Col, Form, InputNumber, Row, Checkbox } from 'antd';
import FormContainer from '../../components/form-style/FormContainer';
import FormPiece from '../../components/form-style/FormPiece';
import styled from 'styled-components';
import { toTitleCase } from '../../utils/helpers';
import { Grade } from '../../containers/library-report/ducks/types';

const InputNumberNoArrows = styled(InputNumber)`
  .ant-input-number-handler-wrap {
    display: none;
  }
`;

const StudentBookInformation: React.FC = () => {
  const gradeOptions = Object.entries(Grade).map(([key, value]) => ({
    label: toTitleCase(key.replace('_', ' ')),
    value,
  }));

  return (
    <FormContainer title="Student and Book Information">
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <FormPiece note="How Many Children attended?">
            <Form.Item
              name="numberOfChildren"
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <InputNumberNoArrows placeholder="#" min={0} />
            </Form.Item>
          </FormPiece>
        </Col>
        <Col span={12}>
          <FormPiece note="How Many Books?">
            <Form.Item
              name="numberOfBooks"
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <InputNumberNoArrows placeholder="#" min={0} />
            </Form.Item>
          </FormPiece>
        </Col>
      </Row>
      <Row gutter={[24, 0]}>
        <Col span={12}>
          <FormPiece note="What grades attended?">
            <Form.Item
              name="gradesAttended"
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <Checkbox.Group options={gradeOptions} />
            </Form.Item>
          </FormPiece>
        </Col>
        <Col span={12}>
          <FormPiece note="Most recent shipment year?">
            <Form.Item
              name="mostRecentShipmentYear"
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <InputNumberNoArrows placeholder="#" min={0} />
            </Form.Item>
          </FormPiece>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default StudentBookInformation;

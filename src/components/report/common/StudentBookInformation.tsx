import { Checkbox, Col, Form, InputNumber, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import FormContainer from '../../form-style/FormContainer';
import FormPiece from '../../form-style/FormPiece';
import { Grade } from '../../../containers/library-report/ducks/types';
import { toTitleCase } from '../../../utils/helpers';
import FormText from '../../form-style/FormText';

const InputNumberNoArrows = styled(InputNumber)`
  .ant-input-number-handler-wrap {
    display: none;
  }
`;

interface StudentBookInformationProps {
  editable?: boolean;
}

const StudentBookInformation: React.FC<StudentBookInformationProps> = ({
  editable,
}) => {

  const gradeOptions = Object.entries(Grade).map(([key, value]) => ({
    label: toTitleCase(key.replace('_', ' ')),
    value,
  }));

  return (
    <FormContainer title="Student and Book Information">
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <FormPiece note="How Many Children attended?">
            <Form.Item name="numberOfChildren">
              {editable ? (
                <InputNumberNoArrows placeholder="#" min={0}/>
              ) : (
                <FormText />
              )}
            </Form.Item>
          </FormPiece>
        </Col>
        <Col span={12}>
          <FormPiece note="How Many Books?">
            <Form.Item name="numberOfBooks">
              {editable ? (
                <InputNumberNoArrows placeholder="#" min={0} disabled />
              ) : (
                <FormText />
              )}
            </Form.Item>
          </FormPiece>
        </Col>
      </Row>
      <Row gutter={[24, 0]}>
        <Col span={12}>
          <FormPiece note="What grades attended?">
            <Form.Item name="gradesAttended">
              <Checkbox.Group disabled={!editable} options={gradeOptions}/>
            </Form.Item>
          </FormPiece>
        </Col>
        <Col span={12}>
          <FormPiece note="Most recent shipment year?">
            <Form.Item name="mostRecentShipmentYear">
              {editable ? (
                <InputNumberNoArrows placeholder="#" min={0} disabled />
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

export default StudentBookInformation;

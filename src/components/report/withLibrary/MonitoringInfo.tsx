import React from 'react';
import { Col, Row } from 'antd';
import FormContainer from '../../form-style/FormContainer';
import FormPieceBoolean from '../../form-style/FormPieceBoolean';

interface MonitoringInfoProps {
  editable?: boolean;
}

const MonitoringInfo: React.FC<MonitoringInfoProps> = ({ editable }) => {
  return (
    <FormContainer title="Monitoring Information">
      <Row gutter={[24, 0]}>
        <Col span={12}>
          <FormPieceBoolean
            name={'hasCheckInTimetables'}
            note={'Does this library keep classroom check-in timetables?'}
            disabled={!editable}
          />
        </Col>
        <Col span={12}>
          <FormPieceBoolean
            name={'hasBookCheckoutSystem'}
            note={'Does the library have a system for book checkouts?'}
            disabled={!editable}
          />
        </Col>
      </Row>
    </FormContainer>
  );
};

export default MonitoringInfo;

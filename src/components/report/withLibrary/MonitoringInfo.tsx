import React, { useState } from 'react';
import { Col, Row } from 'antd';
import FormContainer from '../../form-style/FormContainer';
import FormPieceBoolean from '../../form-style/FormPieceBoolean';
import { Timetable } from '../../../containers/library-report/ducks/types';
import TimeTable from './TimeTable';

interface MonitoringInfoProps {
  editable?: boolean;
  setTimeTable: (tt: Timetable) => void;
  timeTable: Timetable | null;
}

const MonitoringInfo: React.FC<MonitoringInfoProps> = ({
  editable,
  setTimeTable,
  timeTable,
}) => {
  const [showTimeTable, setShowTimeTable] = useState<boolean>(false);

  return (
    <FormContainer title="Monitoring Information">
      <Row gutter={[24, 0]}>
        <Col span={12}>
          <FormPieceBoolean
            name={'hasCheckInTimetables'}
            note={'Does this library keep classroom check-in timetables?'}
            disabled={!editable}
            onChange={(event: any) => setShowTimeTable(event.target.value)}
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
      {showTimeTable && (
        <Row gutter={[0, 24]}>
          <Col span={24}>
            <TimeTable timeTable={timeTable} setTimeTable={setTimeTable} />
          </Col>
        </Row>
      )}
    </FormContainer>
  );
};

export default MonitoringInfo;

import { Col, Row } from 'antd';
import React from 'react';
import { Timetable } from '../../../containers/library-report/ducks/types';
import FormContainer from '../../form-style/FormContainer';
import FormPieceBoolean from '../../form-style/FormPieceBoolean';
import TimeTable from './TimeTable';

interface MonitoringInfoProps {
  editable?: boolean;
  setTimeTable: (tt: Timetable) => void;
  timeTable: Timetable | null;
  showTimeTable: boolean;
  setShowTimeTable: (value: boolean) => void;
}

const MonitoringInfo: React.FC<MonitoringInfoProps> = ({
  editable,
  setTimeTable,
  timeTable,
  setShowTimeTable,
  showTimeTable,
}) => {
  return (
    <FormContainer title="Monitoring Information">
      <Row gutter={[24, 0]}>
        <Col span={12}>
          <FormPieceBoolean
            name={'hasCheckInTimetables'}
            note={'Does this library keep classroom check-in timetables?*'}
            disabled={!editable}
            onChange={(event: any) => setShowTimeTable(event.target.value)}
            required={true}
          />
        </Col>
        <Col span={12}>
          <FormPieceBoolean
            name={'hasBookCheckoutSystem'}
            note={'Does the library have a system for book checkouts?*'}
            disabled={!editable}
            required={true}
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

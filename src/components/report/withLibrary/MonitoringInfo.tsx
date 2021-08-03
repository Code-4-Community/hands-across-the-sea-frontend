import { Col, Row } from 'antd';
import React from 'react';
import { Timetable } from '../../../containers/library-report/ducks/types';
import FormContainer from '../../form-style/FormContainer';
import FormPieceBoolean from '../../form-style/FormPieceBoolean';
import TimeTable from './TimeTable';

interface MonitoringInfoProps {
  editable?: boolean;

  setCheckInTimeTable: (tt: Timetable) => void;
  checkInTimeTable: Timetable | null;
  showCheckInTimeTable: boolean;
  setShowCheckInTimeTable: (value: boolean) => void;

  setCheckOutTimeTable: (tt: Timetable) => void;
  checkOutTimeTable: Timetable | null;
  showCheckOutTimeTable: boolean;
  setShowCheckOutTimeTable: (value: boolean) => void;
}

const MonitoringInfo: React.FC<MonitoringInfoProps> = ({
  editable,
  setCheckInTimeTable,
  checkInTimeTable,
  setShowCheckInTimeTable,
  showCheckInTimeTable,
  setCheckOutTimeTable,
  checkOutTimeTable,
  setShowCheckOutTimeTable,
  showCheckOutTimeTable,
}) => {
  return (
    <FormContainer title="Monitoring Information">
      {showCheckInTimeTable && (
        <Row gutter={[0, 24]}>
          <Col span={24}>
            <TimeTable
              name="Classroom Check-In Table"
              timeTable={checkInTimeTable}
              setTimeTable={setCheckInTimeTable}
            />
          </Col>
        </Row>
      )}
      <Row gutter={[24, 0]}>
        <Col span={12}>
          <FormPieceBoolean
            name={'hasCheckInTimetables'}
            note={'Does this library keep classroom check-in timetables?'}
            disabled={!editable}
            onChange={(event: any) =>
              setShowCheckInTimeTable(event.target.value)
            }
          />
        </Col>
        <Col span={12}>
          <FormPieceBoolean
            name={'hasBookCheckoutSystem'}
            note={'Does the library have a system for book checkouts?'}
            disabled={!editable}
            onChange={(event: any) =>
              setShowCheckOutTimeTable(event.target.value)
            }
          />
        </Col>
      </Row>
      {showCheckOutTimeTable && (
        <Row gutter={[0, 24]}>
          <Col span={24}>
            <TimeTable
              name="Book Check-Out Table"
              timeTable={checkOutTimeTable}
              setTimeTable={setCheckOutTimeTable}
            />
          </Col>
        </Row>
      )}
    </FormContainer>
  );
};

export default MonitoringInfo;

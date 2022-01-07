import { Form, message } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BookLogResponse } from '../../containers/bookLogs/types';
import {
  LibraryReportResponse,
  ReportWithLibraryRequest,
  Timetable,
} from '../../containers/library-report/ducks/types';
import { C4CState } from '../../store';
import { initializeNewReportForm } from '../../utils/reportForm';
import FormContentContainer from '../form-style/FormContentContainer';
import ChangesActionPlan from './common/ChangesActionPlan';
import StudentBookInformation from './common/StudentBookInformation';
import VisitReason from './common/VisitReason';
import LibraryInfo from './withLibrary/LibraryInfo';
import MonitoringInfo from './withLibrary/MonitoringInfo';
import TrainingMentorshipInfo from './withLibrary/TrainingMentorshipInfo';
import { useQuery } from 'react-query';
import protectedApiClient from '../../api/protectedApiClient';

interface ReportWithLibraryProps {
  values?: LibraryReportResponse;
  editable: boolean;
  onSubmit: (values: ReportWithLibraryRequest) => void;
  bookLogInfo: BookLogResponse[];
  isNew: boolean;
}

const ReportWithLibrary: React.FC<ReportWithLibraryProps> = ({
  values,
  editable,
  onSubmit,
  bookLogInfo,
  children,
  isNew,
}) => {
  const [visitReason, setVisitReason] = useState(values?.visitReason || null);
  const [checkInTimeTable, setCheckInTimeTable] = useState<Timetable | null>(
    null,
  );
  const [showCheckInTimeTable, setShowCheckInTimeTable] = useState<boolean>(
    false,
  );
  const [checkOutTimeTable, setCheckOutTimeTable] = useState<Timetable | null>(
    null,
  );
  const [showCheckOutTimeTable, setShowCheckOutTimeTable] = useState<boolean>(
    false,
  );

  const schoolId: number | undefined = useSelector(
    (state: C4CState) => state.selectSchoolState.selectedSchoolId,
  );

  const { isLoading, error, data } = useQuery(
    'latestReport',
    () => protectedApiClient.getLatestReport(schoolId as number),
    {
      enabled: schoolId !== undefined,
    },
  );

  const handleSubmit = (submittedValues: ReportWithLibraryRequest) => {
    onSubmit({
      numberOfStudentLibrarians: 0,
      numberOfStudentLibrariansTrainers: 0,
      parentSupport: '',
      teacherSupport: '',
      checkInTimetable: showCheckInTimeTable ? checkInTimeTable : null,
      checkOutTimetable: showCheckOutTimeTable ? checkOutTimeTable : null,
      ...submittedValues,
      visitReason,
    });
  };

  return (
    <>
      {isLoading && <p>Loading school data...</p>}
      {error && !isNew && <p>Failed to load report</p>}
      {(data || error) && (
        <FormContentContainer>
          <Form
            initialValues={
              isNew
                ? (initializeNewReportForm(
                    data ?? values,
                    bookLogInfo,
                    true,
                  ) as ReportWithLibraryRequest)
                : values
            }
            onFinish={handleSubmit}
            onFinishFailed={() =>
              message.error(
                'Error submitting form, please double check your responses and try again.',
              )
            }
          >
            <VisitReason
              setVisitReason={setVisitReason}
              visitReason={visitReason}
              editable={editable}
            />
            <StudentBookInformation editable={editable} />
            <LibraryInfo editable={editable} />
            <MonitoringInfo
              editable={editable}
              showCheckInTimeTable={showCheckInTimeTable}
              setShowCheckInTimeTable={setShowCheckInTimeTable}
              checkInTimeTable={checkInTimeTable}
              setCheckInTimeTable={setCheckInTimeTable}
              showCheckOutTimeTable={showCheckOutTimeTable}
              setShowCheckOutTimeTable={setShowCheckOutTimeTable}
              checkOutTimeTable={checkOutTimeTable}
              setCheckOutTimeTable={setCheckOutTimeTable}
            />
            <TrainingMentorshipInfo editable={editable} report={values} />
            <ChangesActionPlan editable={editable} />
            {children}
          </Form>
        </FormContentContainer>
      )}
    </>
  );
};

export default ReportWithLibrary;

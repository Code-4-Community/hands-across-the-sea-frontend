import { Form, message } from 'antd';
import React, { useState } from 'react';
import {
  LibraryReportResponse,
  ReportWithLibraryRequest,
  Timetable,
} from '../../containers/library-report/ducks/types';
import FormContentContainer from '../form-style/FormContentContainer';
import ChangesActionPlan from './common/ChangesActionPlan';
import StudentBookInformation from './common/StudentBookInformation';
import VisitReason from './common/VisitReason';
import LibraryInfo from './withLibrary/LibraryInfo';
import MonitoringInfo from './withLibrary/MonitoringInfo';
import TrainingMentorshipInfo from './withLibrary/TrainingMentorshipInfo';

interface ReportWithLibraryProps {
  values?: LibraryReportResponse;
  editable: boolean;
  onSubmit: (values: ReportWithLibraryRequest) => void;
}

const ReportWithLibrary: React.FC<ReportWithLibraryProps> = ({
  values,
  editable,
  onSubmit,
  children,
}) => {
  const [visitReason, setVisitReason] = useState(values?.visitReason || null);
  const [timeTable, setTimeTable] = useState<Timetable | null>(null);
  const [showTimeTable, setShowTimeTable] = useState<boolean>(false);

  const handleSubmit = (submittedValues: ReportWithLibraryRequest) => {
    onSubmit({
      numberOfStudentLibrarians: 0,
      numberOfStudentLibrariansTrainers: 0,
      parentSupport: '',
      teacherSupport: '',
      timetable: showTimeTable ? timeTable : null,
      ...submittedValues,
      visitReason,
    });
  };

  return (
    <FormContentContainer>
      <Form
        initialValues={values}
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
          showTimeTable={showTimeTable}
          setShowTimeTable={setShowTimeTable}
          timeTable={timeTable}
          setTimeTable={setTimeTable}
        />
        <TrainingMentorshipInfo editable={editable} report={values} />
        <ChangesActionPlan editable={editable} />
        {children}
      </Form>
    </FormContentContainer>
  );
};

export default ReportWithLibrary;

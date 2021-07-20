import { Form, message } from 'antd';
import React, { useState } from 'react';
import FormContentContainer from '../form-style/FormContentContainer';
import ChangesActionPlan from './common/ChangesActionPlan';
import MonitoringInfo from './withLibrary/MonitoringInfo';
import StudentBookInformation from './common/StudentBookInformation';
import TrainingMentorshipInfo from './withLibrary/TrainingMentorshipInfo';
import {
  LibraryReportResponse,
  ReportWithLibraryRequest,
} from '../../containers/library-report/ducks/types';
import LibraryInfo from './withLibrary/LibraryInfo';
import VisitReason from './common/VisitReason';

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

  const handleSubmit = (submittedValues: ReportWithLibraryRequest) => {
    onSubmit({
      numberOfStudentLibrarians: 0,
      parentSupport: '',
      teacherSupport: '',
      timetable: null,
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
        <MonitoringInfo editable={editable} />
        <TrainingMentorshipInfo editable={editable} report={values} />
        <ChangesActionPlan editable={editable} />
        {children}
      </Form>
    </FormContentContainer>
  );
};

export default ReportWithLibrary;

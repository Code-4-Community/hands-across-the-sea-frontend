import { Form, message } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  LibraryReportResponse,
  ReportWithLibraryRequest,
  Timetable,
} from '../../containers/library-report/ducks/types';
import { C4CState } from '../../store';
import { AsyncRequest, AsyncRequestKinds } from '../../utils/asyncRequest';
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
  isNew: boolean;
}

const ReportWithLibrary: React.FC<ReportWithLibraryProps> = ({
  values,
  editable,
  onSubmit,
  children,
  isNew
}) => {
  const [visitReason, setVisitReason] = useState(values?.visitReason || null);
  const [timeTable, setTimeTable] = useState<Timetable | null>(null);
  const [showTimeTable, setShowTimeTable] = useState<boolean>(false);

  const latestReport: AsyncRequest<
    LibraryReportResponse,
    any
  > = useSelector(
    (state: C4CState) =>
      state.libraryReportState.latestReport,
  );

  const handleSubmit = (submittedValues: ReportWithLibraryRequest) => {
    onSubmit({
      numberOfStudentLibrarians: 0,
      parentSupport: '',
      teacherSupport: '',
      timetable: showTimeTable ? timeTable : null,
      ...submittedValues,
      visitReason,
    });
  };
   
   switch (latestReport.kind) {
      case AsyncRequestKinds.NotStarted:
      case AsyncRequestKinds.Failed:
        return <p>An error occurred loading last report</p>;
      case AsyncRequestKinds.Loading:
        return <p>Loading school data</p>;
      case AsyncRequestKinds.Completed:
        return (
          <FormContentContainer>
            <Form
              initialValues={isNew ? nullifyWithLibraryReport(latestReport.result) : values}
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
   }
};

const nullifyWithLibraryReport = (report: LibraryReportResponse | undefined): ReportWithLibraryRequest  | undefined => {
  if (report === undefined) {
    return undefined;
  }
  const reportRequest: ReportWithLibraryRequest = {
    numberOfChildren: report.numberOfChildren,
    gradesAttended: report.gradesAttended,
    numberOfBooks: null, 
    mostRecentShipmentYear: null, 
    visitReason: null, 
    actionPlans: null, 
    successStories: null, 
    isSharedSpace: null, 
    hasInvitingSpace: null, 
    assignedPersonRole: null, 
    assignedPersonTitle: null, 
    apprenticeshipProgram: null, 
    trainsAndMentorsApprentices: null, 
    hasCheckInTimetables: null, 
    hasBookCheckoutSystem: null, 
    numberOfStudentLibrarians: null, 
    reasonNoStudentLibrarians: null, 
    hasSufficientTraining: null, 
    teacherSupport: null, 
    parentSupport: null, 
    timetable: null
  }
  return reportRequest;
}

export default ReportWithLibrary;

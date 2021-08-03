import { Form, message } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BookLogResponse } from '../../containers/bookLogs/ducks/types';
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
  bookLogInfo: BookLogResponse[];
  isNew: boolean;
}

const ReportWithLibrary: React.FC<ReportWithLibraryProps> = ({
  values,
  editable,
  onSubmit,
  bookLogInfo,
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
      case AsyncRequestKinds.Loading:
        return <p>Loading school data</p>;
      
      case AsyncRequestKinds.Failed:
      case AsyncRequestKinds.Completed:
        const reportRequest = isNew && latestReport.kind === AsyncRequestKinds.Completed 
          ? nullifyWithLibraryReport(latestReport.result, bookLogInfo) : values;
        return (
          <FormContentContainer>
            <Form
              initialValues={reportRequest}
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

const nullifyWithLibraryReport = (report: LibraryReportResponse | undefined, bookLogs: BookLogResponse[]): ReportWithLibraryRequest  | undefined => {
  if (report === undefined) {
    return undefined;
  }
  bookLogs.sort((a, b) => parseInt(b.date.toString().split(' ')[5]) - parseInt(a.date.toString().split(' ')[5]));
  const reportRequest: ReportWithLibraryRequest = {
    numberOfChildren: report.numberOfChildren,
    gradesAttended: report.gradesAttended,
    numberOfBooks: bookLogs.reduce((a, b) => a + b.count, 0), 
    mostRecentShipmentYear: parseInt(bookLogs[0].date.toString().split(' ')[5]), 
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

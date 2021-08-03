import { Form, message } from 'antd';
import React, { useState } from 'react';
import FormContentContainer from '../form-style/FormContentContainer';
import ChangesActionPlan from './common/ChangesActionPlan';
import StudentBookInformation from './common/StudentBookInformation';
import {
  LibraryReportResponse,
  ReadyTimeline,
  ReportWithoutLibraryRequest,
} from '../../containers/library-report/ducks/types';
import LibraryInfo from './withoutLibrary/LibraryInfo';
import VisitReason from './common/VisitReason';
import { AsyncRequest, AsyncRequestKinds } from '../../utils/asyncRequest';
import { useSelector } from 'react-redux';
import { C4CState } from '../../store';
import { BookLogResponse } from '../../containers/bookLogs/ducks/types';

interface ReportWithoutLibraryProps {
  values?: LibraryReportResponse;
  editable: boolean;
  onSubmit: (values: ReportWithoutLibraryRequest) => void;
  bookLogInfo: BookLogResponse[];
  isNew: boolean;
}

const ReportWithoutLibrary: React.FC<ReportWithoutLibraryProps> = ({
  values,
  editable,
  onSubmit,
  bookLogInfo,
  children,
  isNew,
}) => {
  const [visitReason, setVisitReason] = useState(values?.visitReason || null);

  const handleSubmit = (submittedValues: ReportWithoutLibraryRequest) => {
    onSubmit({
      ...submittedValues,
      visitReason,
    });
  };

  const latestReport: AsyncRequest<LibraryReportResponse, any> = useSelector(
    (state: C4CState) => state.libraryReportState.latestReport,
  );

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
            initialValues={
              isNew
                ? nullifyWithoutLibraryReport(latestReport.result, bookLogInfo)
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
            <ChangesActionPlan editable={editable} />
            {children}
          </Form>
        </FormContentContainer>
      );
  }
};

const nullifyWithoutLibraryReport = (
  report: LibraryReportResponse | undefined,
  bookLogs: BookLogResponse[],
): ReportWithoutLibraryRequest | undefined => {
  if (report === undefined) {
    return undefined;
  }
  bookLogs.sort(
    (a, b) =>
      parseInt(b.date.toString().split(' ')[5], 10) -
      parseInt(a.date.toString().split(' ')[5], 10),
  );
  const reportRequest: ReportWithoutLibraryRequest = {
    numberOfChildren: report.numberOfChildren,
    gradesAttended: report.gradesAttended,
    numberOfBooks: bookLogs.reduce((a, b) => a + b.count, 0),
    mostRecentShipmentYear: parseInt(
      bookLogs[0].date.toString().split(' ')[5],
      10,
    ),
    visitReason: null,
    actionPlans: null,
    successStories: null,
    reason: null,
    wantsLibrary: null,
    hasSpace: null,
    currentStatus: null,
    readyTimeline: ReadyTimeline.UPCOMING_SCHOOL_YEAR,
  };
  return reportRequest;
};

export default ReportWithoutLibrary;

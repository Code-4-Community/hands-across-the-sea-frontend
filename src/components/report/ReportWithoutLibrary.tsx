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

interface ReportWithoutLibraryProps {
  values?: LibraryReportResponse;
  editable: boolean;
  onSubmit: (values: ReportWithoutLibraryRequest) => void;
  isNew: boolean;
}

const ReportWithoutLibrary: React.FC<ReportWithoutLibraryProps> = ({
  values,
  editable,
  onSubmit,
  children,
  isNew
}) => {
  const [visitReason, setVisitReason] = useState(values?.visitReason || null);

  const handleSubmit = (submittedValues: ReportWithoutLibraryRequest) => {
    onSubmit({
      ...submittedValues,
      visitReason,
    });
  };

  const latestReport: AsyncRequest<
    LibraryReportResponse,
    any
  > = useSelector(
    (state: C4CState) =>
      state.libraryReportState.latestReport,
  );

  // useEffect(() => {
  //   form.setFieldsValue(initialValues)
  //  }, [form, initialValues]);
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
        initialValues={isNew ? nullifyWithoutLibraryReport(latestReport.result) : values}
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

const nullifyWithoutLibraryReport = (report: LibraryReportResponse | undefined): ReportWithoutLibraryRequest  | undefined => {
  if (report === undefined) {
    return undefined;
  }
  const reportRequest: ReportWithoutLibraryRequest = {
    numberOfChildren: report.numberOfChildren,
    gradesAttended: report.gradesAttended,
    numberOfBooks: null, 
    mostRecentShipmentYear: null, 
    visitReason: null, 
    actionPlans: null, 
    successStories: null, 
    reason: null,
    wantsLibrary: null,
    hasSpace: null,
    currentStatus: null,
    readyTimeline: ReadyTimeline.UPCOMING_SCHOOL_YEAR
  }
  return reportRequest;
}

export default ReportWithoutLibrary;

import { Form, message } from 'antd';
import React, { useState } from 'react';
import FormContentContainer from '../form-style/FormContentContainer';
import ChangesActionPlan from './common/ChangesActionPlan';
import StudentBookInformation from './common/StudentBookInformation';
import {
  LibraryReportResponse,
  ReportWithoutLibraryRequest,
} from '../../containers/library-report/ducks/types';
import LibraryInfo from './withoutLibrary/LibraryInfo';
import VisitReason from './common/VisitReason';
import { AsyncRequest, asyncRequestIsComplete, asyncRequestIsFailed, asyncRequestIsLoading, asyncRequestIsNotStarted } from '../../utils/asyncRequest';
import { useSelector } from 'react-redux';
import { C4CState } from '../../store';
import { BookLogResponse } from '../../containers/bookLogs/ducks/types';
import { initializeNewReportForm } from '../../utils/reportForm';

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

  return (<>
    { (asyncRequestIsNotStarted(latestReport) || asyncRequestIsLoading(latestReport)) && <p>Loading school data...</p> }
    { asyncRequestIsFailed(latestReport) && <p>Failed to load report</p>}
    { asyncRequestIsComplete(latestReport) && <FormContentContainer>
          <Form
            initialValues={
              isNew
                ? initializeNewReportForm(latestReport.result, bookLogInfo, false) as ReportWithoutLibraryRequest
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
        </FormContentContainer>  }
  </>);
};

export default ReportWithoutLibrary;

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
import { useSelector } from 'react-redux';
import { C4CState } from '../../store';
import { BookLogResponse } from '../../containers/bookLogs/types';
import { initializeNewReportForm } from '../../utils/reportForm';
import { useQuery } from 'react-query';
import protectedApiClient from '../../api/protectedApiClient';
import Loading from "../Loading";

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

  const schoolId: number | undefined = useSelector(
    (state: C4CState) => state.selectSchoolState.selectedSchoolId,
  );

  const { isLoading, error, data } = useQuery(
    'latestReport',
    () => protectedApiClient.getLatestReport(schoolId as number),
    {
      enabled: schoolId !== undefined,
      retry: false,
    },
  );

  return (
    <>
      {isLoading && <Loading title={'Loading school data...'} />}
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
                  ) as ReportWithoutLibraryRequest)
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
      )}
    </>
  );
};

export default ReportWithoutLibrary;

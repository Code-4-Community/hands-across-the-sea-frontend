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

interface ReportWithoutLibraryProps {
  values?: LibraryReportResponse;
  editable: boolean;
  onSubmit: (values: ReportWithoutLibraryRequest) => void;
}

const ReportWithoutLibrary: React.FC<ReportWithoutLibraryProps> = ({
  values,
  editable,
  onSubmit,
  children,
}) => {
  const [visitReason, setVisitReason] = useState(values?.visitReason || null);

  const handleSubmit = (submittedValues: ReportWithoutLibraryRequest) => {
    onSubmit({
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
        <ChangesActionPlan editable={editable} />
        {children}
      </Form>
    </FormContentContainer>
  );
};

export default ReportWithoutLibrary;

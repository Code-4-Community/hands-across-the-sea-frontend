import { Button, Col, Form, Input, message, Row } from 'antd';
import React from 'react';
import FormContainer from '../form-style/FormContainer';
import FormContentContainer from '../form-style/FormContentContainer';
import FormPiece from '../form-style/FormPiece';
import ChangesActionPlan from './common/ChangesActionPlan';
import MonitoringInfo from './withLibrary/MonitoringInfo';
import StudentBookInformation from './common/StudentBookInformation';
import TrainingMentorshipInfo from './withLibrary/TrainingMentorshipInfo';
import {
  LibraryReportResponse,
  ReportWithLibraryRequest,
} from '../../containers/library-report/ducks/types';
import LibraryInfo from './withLibrary/LibraryInfo';

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
  return (
    <FormContentContainer>
      <Form
        initialValues={values}
        onFinish={onSubmit}
        onFinishFailed={() =>
          message.error(
            'Error submitting form, please double check your responses and try again.',
          )
        }
      >
        <FormContainer title="Reason for Visit">
          <Row>
            <Col flex={24}>
              <FormPiece note="What is the purpose of today's visit?">
                <Form.Item name={'visitReason'}>
                  <Input />
                </Form.Item>
              </FormPiece>
            </Col>
          </Row>
        </FormContainer>
        <StudentBookInformation editable={editable} />
        <LibraryInfo editable={editable} />
        <MonitoringInfo editable={editable} />
        <TrainingMentorshipInfo editable={editable} />
        <ChangesActionPlan editable={editable} />
        { children }
      </Form>
    </FormContentContainer>
  );
};

export default ReportWithLibrary;

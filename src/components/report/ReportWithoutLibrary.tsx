import { Button, Col, Form, Input, message, Row } from 'antd';
import React from 'react';
import FormContainer from '../form-style/FormContainer';
import FormContentContainer from '../form-style/FormContentContainer';
import FormPiece from '../form-style/FormPiece';
import ChangesActionPlan from './common/ChangesActionPlan';
import StudentBookInformation from './common/StudentBookInformation';
import {
  LibraryReportResponse,
  ReportWithoutLibraryRequest,
} from '../../containers/library-report/ducks/types';
import LibraryInfo from './withoutLibrary/LibraryInfo';

interface ReportWithoutLibraryProps {
  values?: LibraryReportResponse;
  editable: boolean;
  onSubmit: (values: ReportWithoutLibraryRequest) => void;
}

const ReportWithoutLibrary: React.FC<ReportWithoutLibraryProps> = ({
  values,
  editable,
  onSubmit,
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
        <ChangesActionPlan editable={editable} />
        <Button htmlType="submit">Submit</Button>
      </Form>
    </FormContentContainer>
  );
};

export default ReportWithoutLibrary;

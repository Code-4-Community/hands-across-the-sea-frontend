import { Button, Col, Form, Input, message, Row } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import protectedApiClient from '../../api/protectedApiClient';
import { Routes } from '../../App';
import FormContainer from '../../components/form-style/FormContainer';
import FormContentContainer from '../../components/form-style/FormContentContainer';
import FormPiece from '../../components/form-style/FormPiece';
import ChangesActionPlan from '../../components/report/ChangesActionPlan';
import MonitoringInfo from '../../components/report/MonitoringInfo';
import StudentBookInformation from '../../components/report/StudentBookInformation';
import TrainingMentorshipInfo from '../../components/report/TrainingMentorshipInfo';
import { C4CState } from '../../store';
import { loadLatestLibraryReport } from './ducks/thunks';
import {
  ReportWithLibraryRequest,
  ReportWithoutLibraryRequest,
} from './ducks/types';
import ReportWithLibrary from './ReportWithLibrary';
import ReportWithoutLibrary from './ReportWithoutLibrary';

const LibraryReport = () => {
  const dispatch = useDispatch();
  const isYesReport = useSelector(
    (state: C4CState) => state.libraryReportState.isYesReport,
  );
  const schoolId = useSelector(
    (state: C4CState) => state.selectSchoolState.selectedSchoolId,
  );
  const history = useHistory();

  if (!schoolId) {
    history.replace(Routes.HOME);
  }

  const handleSubmit = async (
    report: ReportWithLibraryRequest | ReportWithoutLibraryRequest,
  ) => {
    if (schoolId === undefined) {
      throw new Error('School ID is undefined');
    }
    try {
      if (isYesReport) {
        await protectedApiClient.createReportWithLibrary(
          schoolId,
          report as ReportWithLibraryRequest,
        );
      } else {
        await protectedApiClient.createReportWithoutLibrary(
          schoolId,
          report as ReportWithoutLibraryRequest,
        );
      }
      dispatch(loadLatestLibraryReport(schoolId));
      history.replace(Routes.FORM_SUB_CONFIRMATION);
    } catch (err) {
      message.error('Error submitting report, please try again.');
    }
  };

  return (
    <FormContentContainer>
      <Form
        onFinish={handleSubmit}
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
                <Form.Item
                  name={'visitReason'}
                >
                  <Input />
                </Form.Item>
              </FormPiece>
            </Col>
          </Row>
        </FormContainer>
        <StudentBookInformation />
        {isYesReport && (
          <>
            <ReportWithLibrary />
            <MonitoringInfo />
            <TrainingMentorshipInfo />
          </>
        )}
        {!isYesReport && <ReportWithoutLibrary />}
        <ChangesActionPlan />
        <Button htmlType="submit">Submit</Button>
      </Form>
    </FormContentContainer>
  );
};

export default LibraryReport;

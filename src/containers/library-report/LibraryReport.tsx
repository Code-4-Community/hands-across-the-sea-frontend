import React from 'react';
import ReportWithLibrary from './ReportWithLibrary';
import {
  ReportWithLibraryRequest,
  ReportWithoutLibraryRequest,
} from './ducks/types';
import { useDispatch, useSelector } from 'react-redux';
import {
  createReportWithLibrary,
  createReportWithoutLibrary,
} from './ducks/thunks';
import { C4CState } from '../../store';
import FormContentContainer from '../../components/form-style/FormContentContainer';
import { Button, Col, Form, Input, Row } from 'antd';
import FormContainer from '../../components/form-style/FormContainer';
import FormPiece from '../../components/form-style/FormPiece';
import StudentBookInformation from '../../components/report/StudentBookInformation';
import MonitoringInfo from '../../components/report/MonitoringInfo';
import TrainingMentorshipInfo from '../../components/report/TrainingMentorshipInfo';
import ChangesActionPlan from '../../components/report/ChangesActionPlan';
import ReportWithoutLibrary from './ReportWithoutLibrary';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../App';

const LibraryReport = () => {
  const dispatch = useDispatch();
  const isYesReport = useSelector(
    (state: C4CState) => state.libraryReportState.isYesReport,
  );
  const schoolId = useSelector(
    (state: C4CState) => state.selectSchoolState.selectedSchoolId,
  );
  const history = useHistory();

  if (!schoolId) return null;

  const handleSubmit = (
    report: ReportWithLibraryRequest | ReportWithoutLibraryRequest,
  ) => {
    if (isYesReport) {
      dispatch(
        createReportWithLibrary(schoolId, report as ReportWithLibraryRequest),
      );
    } else {
      dispatch(
        createReportWithoutLibrary(
          schoolId,
          report as ReportWithoutLibraryRequest,
        ),
      );
    }
    history.replace(Routes.FORM_SUB_CONFIRMATION);
  };

  return (
    <FormContentContainer>
      <Form onFinish={handleSubmit}>
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

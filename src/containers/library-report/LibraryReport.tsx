import { Button, Col, Form, message, Row } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { C4CState } from '../../store';
import FormContentContainer from '../../components/form-style/FormContentContainer';
import { useHistory } from 'react-router-dom';
import protectedApiClient from '../../api/protectedApiClient';
import { Routes } from '../../App';
import FormContainer from '../../components/form-style/FormContainer';
import StudentBookInformation from '../../components/report/StudentBookInformation';
import ChangesActionPlan from '../../components/report/ChangesActionPlan';
import MonitoringInfo from '../../components/report/MonitoringInfo';
import TrainingMentorshipInfo from '../../components/report/TrainingMentorshipInfo';
import { loadLatestLibraryReport } from './ducks/thunks';
import {
  ReportWithLibraryFormData,
  ReportWithLibraryRequest,
  ReportWithoutLibraryFormData,
  ReportWithoutLibraryRequest,
} from './ducks/types';
import ReportWithLibrary from './ReportWithLibrary';
import ReportWithoutLibrary from './ReportWithoutLibrary';
import PurposeOfVisit from '../../components/report/PurposeOfVisit';

const LibraryReport = () => {
  const dispatch = useDispatch();
  const isYesReport = useSelector(
    (state: C4CState) => state.libraryReportState.isYesReport,
  );
  const schoolId = useSelector(
    (state: C4CState) => state.selectSchoolState.selectedSchoolId,
  );
  const history = useHistory();
  const [purposeOfVisitSelection, setPurposeOfVisitSelection] = useState<
    string | null
  >(null);

  if (!schoolId) {
    history.replace(Routes.HOME);
  }

  const handleSubmit = async (
    reportData: ReportWithLibraryFormData | ReportWithoutLibraryFormData,
  ) => {
    if (reportData.visitReason === 'Other') {
      reportData.visitReason = reportData.otherVisitReason;
    }
    delete reportData.otherVisitReason;
    if (schoolId === undefined) {
      throw new Error('School ID is undefined');
    }
    try {
      if (isYesReport) {
        await protectedApiClient.createReportWithLibrary(
          schoolId,
          reportData as ReportWithLibraryRequest,
        );
      } else {
        await protectedApiClient.createReportWithoutLibrary(
          schoolId,
          reportData as ReportWithoutLibraryRequest,
        );
      }
      dispatch(loadLatestLibraryReport(schoolId));
      history.replace(Routes.FORM_SUB_CONFIRMATION);
    } catch (err) {
      message.error(
        'Error submitting form, please double check your responses and try again.',
      );
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
              <PurposeOfVisit
                setPurposeOfVisitSelection={setPurposeOfVisitSelection}
                purposeOfVisit={purposeOfVisitSelection}
              />
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

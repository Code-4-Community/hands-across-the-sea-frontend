import React, { useState } from 'react';
import ReportWithLibrary from './ReportWithLibrary';
import {
  ReportWithLibraryFormData,
  ReportWithLibraryRequest,
  ReportWithoutLibraryFormData,
  ReportWithoutLibraryRequest,
} from './ducks/types';
import { useDispatch, useSelector } from 'react-redux';
import {
  createReportWithLibrary,
  createReportWithoutLibrary,
} from './ducks/thunks';
import { C4CState } from '../../store';
import FormContentContainer from '../../components/form-style/FormContentContainer';
import { Button, Col, Form, Row } from 'antd';
import FormContainer from '../../components/form-style/FormContainer';
import StudentBookInformation from '../../components/report/StudentBookInformation';
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
import { useHistory } from 'react-router-dom';
import { Routes } from '../../App';
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

  const handleSubmit = (
    reportData: ReportWithLibraryFormData | ReportWithoutLibraryFormData,
  ) => {
    if (reportData.visitReason === 'Other') {
      reportData.visitReason = reportData.otherVisitReason;
    }
    delete reportData.otherVisitReason;
    if (isYesReport) {
      dispatch(
        createReportWithLibrary(
          schoolId,
          reportData as ReportWithLibraryRequest,
        ),
      );
    } else {
      dispatch(
        createReportWithoutLibrary(
          schoolId,
          reportData as ReportWithoutLibraryRequest,
        ),
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

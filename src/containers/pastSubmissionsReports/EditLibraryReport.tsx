import {
  ReportWithLibraryRequest,
  ReportWithoutLibraryRequest,
} from '../library-report/ducks/types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { C4CState } from '../../store';
import { useHistory } from 'react-router-dom';
import protectedApiClient from '../../api/protectedApiClient';
import { Routes } from '../../App';
import { message } from 'antd';
import { setActiveReport } from './ducks/actions';
import FormButtons from '../../components/form-style/FormButtons';
import ReportWithLibrary from '../../components/report/ReportWithLibrary';
import ReportWithoutLibrary from '../../components/report/ReportWithoutLibrary';
import { BookLogResponse } from '../bookLogs/ducks/types';
import { getBookLogs } from '../bookLogs/ducks/thunks';
import {
  AsyncRequest,
  asyncRequestIsComplete,
  asyncRequestIsFailed,
  asyncRequestIsLoading,
  asyncRequestIsNotStarted,
} from '../../utils/asyncRequest';

const EditLibraryReport: React.FC = () => {
  const dispatch = useDispatch();
  const report = useSelector(
    (state: C4CState) => state.pastSubmissionReportsState.activeReport,
  );
  const bookLogs: AsyncRequest<BookLogResponse[], any> = useSelector(
    (state: C4CState) => state.bookLogsState.bookLogs,
  );
  const history = useHistory();
  const isYesReport = report && report.libraryStatus === 'EXISTS';
  const [editMode, setEditMode] = useState(false);
  const schoolId = useSelector(
    (state: C4CState) => state.selectSchoolState.selectedSchoolId,
  );

  useEffect(() => {
    if (!report) {
      history.replace(Routes.PAST_SUBMISSIONS_REPORTS);
    }
    if (schoolId !== undefined) {
      dispatch(getBookLogs(schoolId));
    }
  }, [report, history, schoolId, dispatch]);

  if (!report) return null;

  const handleSubmit = async (
    submittedReport: ReportWithLibraryRequest | ReportWithoutLibraryRequest,
  ) => {
    try {
      if (isYesReport) {
        await protectedApiClient.editReportWithLibrary(
          report.schoolId,
          report.id,
          submittedReport as ReportWithLibraryRequest,
        );
      } else {
        await protectedApiClient.editReportWithoutLibrary(
          report.schoolId,
          report.id,
          submittedReport as ReportWithoutLibraryRequest,
        );
      }
      dispatch(setActiveReport(undefined));
      history.replace(Routes.FORM_SUB_CONFIRMATION);
    } catch (err) {
      message.error(
        'Error submitting form, please double check your responses and try again.',
      );
    }
  };

  const buttons = (
    <FormButtons>
      {editMode ? (
        <>
          <FormButtons.Button
            text="Cancel"
            type="secondary"
            onClick={() => setEditMode(false)}
          />
          <FormButtons.Button text="Submit" type="primary" isSubmit={true} />
        </>
      ) : (
        <FormButtons.Button
          text="Edit"
          type="primary"
          onClick={() => setEditMode(true)}
        />
      )}
    </FormButtons>
  );

  return (
    <>
      {(asyncRequestIsNotStarted(bookLogs) ||
        asyncRequestIsLoading(bookLogs)) && <p>Loading school data...</p>}
      {asyncRequestIsFailed(bookLogs) && <p>Failed to load report data</p>}
      {asyncRequestIsComplete(bookLogs) &&
        (isYesReport ? (
          <ReportWithLibrary
            isNew={false}
            children={buttons}
            bookLogInfo={bookLogs.result}
            editable={true}
            onSubmit={handleSubmit}
            values={report}
          />
        ) : (
          <ReportWithoutLibrary
            isNew={false}
            children={buttons}
            bookLogInfo={bookLogs.result}
            editable={true}
            onSubmit={handleSubmit}
            values={report}
          />
        ))}
    </>
  );
};

export default EditLibraryReport;

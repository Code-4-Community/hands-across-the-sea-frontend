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
import { useQuery } from 'react-query';

const EditLibraryReport: React.FC = () => {
  const dispatch = useDispatch();
  const report = useSelector(
    (state: C4CState) => state.pastSubmissionReportsState.activeReport,
  );
  const schoolId = useSelector(
    (state: C4CState) => state.selectSchoolState.selectedSchoolId,
  );
  const { isLoading, error, data } = useQuery(
    'bookLogs',
    () => protectedApiClient.getBookLogs(schoolId as number),
    {
      enabled: schoolId !== undefined,
    },
  );
  const history = useHistory();
  const isYesReport = report && report.libraryStatus === 'EXISTS';
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!report) {
      history.replace(Routes.PAST_SUBMISSIONS_REPORTS);
    }
  }, [report, history]);

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
      {isLoading && <p>Loading school data...</p>}
      {error && <p>Failed to load report data</p>}
      {data &&
        (isYesReport ? (
          <ReportWithLibrary
            isNew={false}
            // eslint-disable-next-line react/no-children-prop
            children={buttons}
            bookLogInfo={data}
            editable={editMode}
            onSubmit={handleSubmit}
            values={report}
          />
        ) : (
          <ReportWithoutLibrary
            isNew={false}
            // eslint-disable-next-line react/no-children-prop
            children={buttons}
            bookLogInfo={data}
            editable={editMode}
            onSubmit={handleSubmit}
            values={report}
          />
        ))}
    </>
  );
};

export default EditLibraryReport;

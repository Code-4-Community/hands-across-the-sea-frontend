import { message } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import protectedApiClient from '../../api/protectedApiClient';
import { Routes } from '../../App';
import FormButtons from '../../components/form-style/FormButtons';
import ReportWithLibrary from '../../components/report/ReportWithLibrary';
import ReportWithoutLibrary from '../../components/report/ReportWithoutLibrary';
import { loadLatestLibraryReport } from '../../containers/library-report/ducks/thunks';
import {
  ReportWithLibraryRequest,
  ReportWithoutLibraryRequest,
} from '../../containers/library-report/ducks/types';
import { C4CState } from '../../store';
import { AsyncRequest, AsyncRequestKinds } from '../../utils/asyncRequest';
import { getBookLogs } from '../bookLogs/ducks/thunks';
import { BookLogResponse } from '../bookLogs/ducks/types';

const NewLibraryReport = () => {
  const dispatch = useDispatch();
  const isYesReport = useSelector(
    (state: C4CState) => state.libraryReportState.isYesReport,
  );
  const schoolId = useSelector(
    (state: C4CState) => state.selectSchoolState.selectedSchoolId,
  );
  const bookLogs: AsyncRequest<
    BookLogResponse[],
    any
  > = useSelector(
    (state: C4CState) =>
      state.bookLogsState.bookLogs,
  );
  const history = useHistory();

  if (!schoolId) {
    history.replace(Routes.HOME);
  }

  useEffect(() => {
    if (schoolId !== undefined) {
      dispatch(loadLatestLibraryReport(schoolId));
      dispatch(getBookLogs(schoolId));
    }
  }, [schoolId, dispatch])

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
      // TODO: show a better error message
      message.error(`Error submitting form: ${err.message}`);
    }
  };

  const buttons = (
    <FormButtons>
      <FormButtons.Button text="Submit" type="primary" isSubmit={true} />
    </FormButtons>
  );

  switch (bookLogs.kind) {
    case AsyncRequestKinds.NotStarted:
    case AsyncRequestKinds.Failed:
      return <p>An error occurred loading school info</p>;
    case AsyncRequestKinds.Loading:
      return <p>Loading school data</p>;
    case AsyncRequestKinds.Completed:
      const props = {
        editable: true,
        onSubmit: handleSubmit,
        children: buttons,
        bookLogInfo: bookLogs.result,
        isNew: true
      };
      return isYesReport ? (
        <ReportWithLibrary {...props} />
      ) : (
        <ReportWithoutLibrary {...props} />
      );
  }
};

export default NewLibraryReport;

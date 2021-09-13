import { message } from 'antd';
import React from 'react';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import protectedApiClient from '../../api/protectedApiClient';
import { Routes } from '../../App';
import FormButtons from '../../components/form-style/FormButtons';
import ReportWithLibrary from '../../components/report/ReportWithLibrary';
import ReportWithoutLibrary from '../../components/report/ReportWithoutLibrary';
import {
  ReportWithLibraryRequest,
  ReportWithoutLibraryRequest,
} from '../../containers/library-report/ducks/types';
import { C4CState } from '../../store';

const NewLibraryReport = () => {
  const isYesReport = useSelector(
    (state: C4CState) => state.libraryReportState.isYesReport,
  );
  const schoolId = useSelector(
    (state: C4CState) => state.selectSchoolState.selectedSchoolId,
  );
  const history = useHistory();

  if (!schoolId) {
    history.replace(Routes.HOME);
    return <></>;
  }

  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries('latestLibraryReport');
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

  const props = {
    editable: true,
    onSubmit: handleSubmit,
    children: buttons,
  };

  return isYesReport ? (
    <ReportWithLibrary {...props} />
  ) : (
    <ReportWithoutLibrary {...props} />
  );
};

export default NewLibraryReport;

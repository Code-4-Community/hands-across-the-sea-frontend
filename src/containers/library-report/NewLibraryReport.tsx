import { message } from 'antd';
import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
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
} from './ducks/types';
import { C4CState } from '../../store';
import Loading from '../../components/Loading';

const NewLibraryReport: React.FC = () => {
  const isYesReport = useSelector(
    (state: C4CState) => state.libraryReportState.isYesReport,
  );
  const schoolId = useSelector(
    (state: C4CState) => state.selectSchoolState.selectedSchoolId,
  );
  const { isLoading, error, data } = useQuery(
    'bookLogs',
    () => protectedApiClient.getBookLogs(schoolId as number),
    {
      enabled: schoolId !== undefined,
      retry: false,
    },
  );

  const history = useHistory();
  const queryClient = useQueryClient();

  if (schoolId === undefined) {
    history.replace(Routes.HOME);
    return <></>;
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

  return (
    <>
      {isLoading && <Loading title={'Loading school data...'} />}
      {error && <p>Failed to load report data</p>}
      {data &&
        (isYesReport ? (
          <ReportWithLibrary
            isNew={true}
            children={buttons}
            bookLogInfo={data}
            editable={true}
            onSubmit={handleSubmit}
          />
        ) : (
          <ReportWithoutLibrary
            isNew={true}
            children={buttons}
            bookLogInfo={data}
            editable={true}
            onSubmit={handleSubmit}
          />
        ))}
    </>
  );
};

export default NewLibraryReport;

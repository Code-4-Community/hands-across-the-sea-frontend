import { message } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import protectedApiClient from '../../api/protectedApiClient';
import { Routes } from '../../App';
import { C4CState } from '../../store';
import { SelectSchoolReducerState } from '../selectSchool/ducks/types';
import { SchoolRequest, SchoolResponse } from './types';
import SchoolInformationForm from './SchoolInformationForm';

const SchoolInformation: React.FC = () => {
  const history = useHistory();
  const schoolId: SelectSchoolReducerState['selectedSchoolId'] = useSelector(
    (state: C4CState) => state.selectSchoolState.selectedSchoolId,
  );
  const { isLoading, error, data } = useQuery(
    'schoolInformation',
    () => protectedApiClient.getSchool(schoolId as number),
    {
      enabled: schoolId !== undefined,
    },
  );
  if (schoolId === undefined) {
    history.push(Routes.SELECT_SCHOOL);
    return <></>;
  }

  const handleFinish = (schoolInfo: SchoolResponse) => async (
    schoolRequest: SchoolRequest,
    editMade: boolean,
  ): Promise<void> => {
    try {
      if (editMade && schoolId) {
        schoolRequest.hidden = schoolInfo.hidden;
        await protectedApiClient.updateSchool(schoolId, schoolRequest);
      }
    } catch (error) {
      message.warning(error);
    }
    history.push('/school-contacts');
  };

  return (
    <>
      {isLoading && <p>Loading school information...</p>}
      {error && <p>Failed to load school information</p>}
      {data && (
        <SchoolInformationForm
          onFinish={handleFinish(data)}
          defaultSchoolInformation={data}
        />
      )}
    </>
  );
};

export default SchoolInformation;

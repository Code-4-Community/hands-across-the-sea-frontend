import React from 'react';
import SchoolInformationForm from '../../components/schoolInfoForm';
import { SchoolRequest } from './ducks/types';
import { useDispatch } from 'react-redux';
import { createSchoolRequest } from './ducks/thunks';

const SchoolInfo: React.FC = () => {
  const dispatch = useDispatch();

  const handleFinish = (schoolRequest: SchoolRequest): void => {
    dispatch(createSchoolRequest(schoolRequest));
  };

  return <SchoolInformationForm onFinish={handleFinish} />;
};

export default SchoolInfo;

import React from 'react';
import { useEffect } from 'react';
import SchoolInformationForm from '../../components/schoolInfoForm';
import { SchoolRequest } from './ducks/types';
import { useDispatch } from 'react-redux';
import { createSchoolRequest, getSchoolRequest } from './ducks/thunks';

const SchoolInfo: React.FC = () => {
  const dispatch = useDispatch();
  const SCHOOL_ID = 123;

  useEffect(() => {
    const response = getSchoolRequest(SCHOOL_ID);
  });

  const handleFinish = (schoolRequest: SchoolRequest): void => {
    dispatch(createSchoolRequest(schoolRequest));
  };

  return <SchoolInformationForm onFinish={handleFinish} />;
};

export default SchoolInfo;

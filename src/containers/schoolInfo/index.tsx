import React from 'react';
import SchoolInformationForm from '../../components/schoolInfoForm';
import { SchoolRequest } from './ducks/types';

const SchoolInfo: React.FC = () => {
  const handleFinish = (schoolRequest: SchoolRequest): void => {};

  return <SchoolInformationForm onFinish={handleFinish} />;
};

export default SchoolInfo;

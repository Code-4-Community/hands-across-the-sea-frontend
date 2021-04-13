import React from 'react';
import { useEffect } from 'react';
import SchoolInformationForm from '../../components/schoolInfoForm';
import { SchoolInformationReducerState, SchoolRequest } from './ducks/types';
import { connect, useDispatch } from 'react-redux';
import { createSchoolRequest, getSchoolRequest } from './ducks/thunks';
import { C4CState } from '../../store';

interface SchoolInformationProps {
  readonly schoolInformation: SchoolInformationReducerState['schoolInformation'];
}

const SchoolInformation: React.FC<SchoolInformationProps> = ({
  schoolInformation,
}) => {
  const dispatch = useDispatch();
  const SCHOOL_ID = 123;

  /*useEffect(() => {
    dispatch(getSchoolRequest(SCHOOL_ID));
  });*/

  const handleFinish = (schoolRequest: SchoolRequest): void => {
    dispatch(createSchoolRequest(schoolRequest));
  };

  return <SchoolInformationForm onFinish={handleFinish} />;
};

const mapStateToProps = (state: C4CState): SchoolInformationProps => {
  return {
    schoolInformation: state.schoolInformationState.schoolInformation,
  };
};

export default connect(mapStateToProps)(SchoolInformation);

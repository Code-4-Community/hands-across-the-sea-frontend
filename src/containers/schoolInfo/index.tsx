import React, { useEffect } from 'react';
import SchoolInformationForm from '../../components/schoolInfoForm';
import { SchoolInformationReducerState, SchoolRequest } from './ducks/types';
import { useDispatch, useSelector } from 'react-redux';
import {
  createSchoolRequest,
  getSchoolRequest,
  updatedSchoolRequest,
} from './ducks/thunks';
import { C4CState } from '../../store';
import { AsyncRequestKinds } from '../../utils/asyncRequest';
import { SelectSchoolReducerState } from '../selectSchool/ducks/types';

const SchoolInformation: React.FC = () => {
  const dispatch = useDispatch();
  const schoolId: SelectSchoolReducerState['selectedSchoolId'] = useSelector(
    (state: C4CState) => state.selectSchoolState.selectedSchoolId,
  );
  const schoolInformation: SchoolInformationReducerState['schoolInformation'] = useSelector(
    (state: C4CState) => state.schoolInformationState.schoolInformation,
  );

  useEffect(() => {
    if (schoolId !== undefined) {
      dispatch(getSchoolRequest(schoolId));
    }
  }, [schoolId, dispatch]);

  const handleFinish = (schoolRequest: SchoolRequest): void => {
    schoolId === undefined
      ? dispatch(createSchoolRequest(schoolRequest))
      : dispatch(updatedSchoolRequest(schoolId, schoolRequest));
  };

  switch (schoolInformation.kind) {
    case AsyncRequestKinds.NotStarted:
    case AsyncRequestKinds.Loading:
      return <p>Loading school information...</p>;
    case AsyncRequestKinds.Failed:
      return <p>Failed to load school information</p>;
    case AsyncRequestKinds.Completed:
      return (
        <SchoolInformationForm
          onFinish={handleFinish}
          defaultSchoolInformation={schoolInformation.result}
        />
      );
  }
};

export default SchoolInformation;
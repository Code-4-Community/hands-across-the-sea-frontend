import React, { useEffect } from 'react';
import {
  SchoolInformationReducerState,
  SchoolRequest,
  SchoolResponse,
} from './ducks/types';
import { useDispatch, useSelector } from 'react-redux';
import { getSchoolRequest, updatedSchoolRequest } from './ducks/thunks';
import { C4CState } from '../../store';
import { AsyncRequestKinds } from '../../utils/asyncRequest';
import { SelectSchoolReducerState } from '../selectSchool/ducks/types';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../App';
import SchoolInformationForm from './SchoolInformationForm';

const SchoolInformation: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const schoolId: SelectSchoolReducerState['selectedSchoolId'] = useSelector(
    (state: C4CState) => state.selectSchoolState.selectedSchoolId,
  );
  const schoolInformation: SchoolInformationReducerState['schoolInformation'] = useSelector(
    (state: C4CState) => state.schoolInformationState.schoolInformation,
  );

  useEffect(() => {
    if (schoolId !== undefined) {
      dispatch(getSchoolRequest(schoolId));
    } else {
      history.push(Routes.SELECT_SCHOOL);
    }
  }, [schoolId, dispatch, history]);

  const handleFinish = (schoolInfo: SchoolResponse) => (
    schoolRequest: SchoolRequest,
    editMade: boolean,
  ): void => {
    if (editMade && schoolId) {
      schoolRequest.hidden = schoolInfo.hidden;
      dispatch(updatedSchoolRequest(schoolId, schoolRequest));
    }
    history.push('/school-contacts');
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
          onFinish={handleFinish(schoolInformation.result)}
          defaultSchoolInformation={schoolInformation.result}
        />
      );
  }
};

export default SchoolInformation;

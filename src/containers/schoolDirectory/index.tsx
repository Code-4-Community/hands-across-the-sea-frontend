import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncRequest, AsyncRequestKinds } from '../../utils/asyncRequest';
import { SchoolEntry } from '../selectSchool/ducks/types';
import { C4CState } from '../../store';
import { loadSchools } from '../selectSchool/ducks/thunks';
import SchoolDir from '../../components/schoolDirectory/SchoolDirectory';

const SchoolDirectory: React.FC = () => {
  const dispatch = useDispatch();
  const availableSchools: AsyncRequest<SchoolEntry[], any> = useSelector(
    (state: C4CState) => state.selectSchoolState.schools,
  );

  useEffect(() => {
    dispatch(loadSchools());
  }, [dispatch]);

  switch (availableSchools.kind) {
    case AsyncRequestKinds.NotStarted:
    case AsyncRequestKinds.Loading:
      return <p>Loading schools...</p>;
    case AsyncRequestKinds.Failed:
      return <p>An error occurred loading schools</p>;
    case AsyncRequestKinds.Completed:
      return <SchoolDir schools={availableSchools.result} />;
  }
};

export default SchoolDirectory;

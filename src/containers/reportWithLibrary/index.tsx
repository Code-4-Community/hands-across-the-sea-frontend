import React from 'react';
import ReportWithLibrary from '../../components/reportWithLibrary/ReportWithLibrary';
import { ReportWithLibraryRequest } from './ducks/types';
import { useDispatch } from 'react-redux';
import { createReportWithLibrary } from './ducks/thunks';

const ReportWithLibraryContainer = () => {
  const dispatch = useDispatch();
  //
  // TODO: Add functionality for loading existing data
  //
  //
  // useEffect(() => {
  //   dispatch(loadReportWithLibrary(reportWithLibraryId));
  // }, [reportWithLibraryId]);
  //
  // const report = useSelector((state: C4CState) =>
  //   getReportWithLibrary(state.reportWithLibraryState),
  // );

  const schoolId = 1; // TODO

  const handleSubmit = (report: ReportWithLibraryRequest) => {
    dispatch(createReportWithLibrary(schoolId, report));
  };

  return <ReportWithLibrary onSubmit={handleSubmit} />;
};

export default ReportWithLibraryContainer;

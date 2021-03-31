import React from 'react';
import ReportWithLibrary from '../../components/reportWithLibrary/ReportWithLibrary';
import { ReportWithLibraryRequest } from './ducks/types';

const ReportWithLibraryContainer = () => {
  // TODO: Add functionality for loading existing data
  //
  // const dispatch = useDispatch();
  //
  // useEffect(() => {
  //   dispatch(loadReportWithLibrary(reportWithLibraryId));
  // }, [reportWithLibraryId]);
  //
  // const report = useSelector((state: C4CState) =>
  //   getReportWithLibrary(state.reportWithLibraryState),
  // );

  const handleSubmit = (r: ReportWithLibraryRequest) => {
    // tslint:disable-next-line:no-console
    console.log(r);
    // TODO
  };

  return <ReportWithLibrary onSubmit={handleSubmit} />;
};

export default ReportWithLibraryContainer;

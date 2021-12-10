import { Button } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../App';
import { LibraryReportResponse } from '../library-report/ducks/types';
import { setActiveReport } from './ducks/actions';

interface PastSubmissionActionsProps {
  report: LibraryReportResponse;
}

const PastSubmissionActions: React.FC<PastSubmissionActionsProps> = ({
  report,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const viewReport = () => {
    dispatch(setActiveReport(report));
    history.push(Routes.EDIT_LIBRARY_REPORT);
  };

  return (
    <div>
      <Button type="primary" onClick={viewReport}>
        View/Edit
      </Button>
    </div>
  );
};

export default PastSubmissionActions;

import { Button, Dropdown, Menu } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../App';
import { LibraryReportResponse } from '../library-report/ducks/types';
import { setActiveReport } from './ducks/actions';
import protectedApiClient from '../../api/protectedApiClient';
import fileDownload from 'js-file-download';

interface PastSubmissionActionsProps {
  report: LibraryReportResponse;
}

interface EventProps {
  key: string;
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

  const { data } = useQuery(
    'reports',
    () => {
      if (report && report.libraryStatus === 'EXISTS') {
        protectedApiClient.getReportWithLibraryCsv(report.id);
      } else {
        protectedApiClient.getReportWithoutLibraryCsv(report.id);
      }
    },
    {
      enabled: report.id !== undefined,
    },
  );

  const downloadReport = () => {
    if (data) {
      fileDownload(data, `Report${report.schoolName}-${report.id}.csv`);
    }
  };

  const handleMenuClick = (e: EventProps) => {
    if (e.key === '1') {
      viewReport();
    } else if (e.key === '2') {
      downloadReport();
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">View/Edit</Menu.Item>
      <Menu.Item key="2">Download as CSV</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Dropdown overlay={menu}>
        <Button type="primary">Actions</Button>
      </Dropdown>
    </div>
  );
};

export default PastSubmissionActions;

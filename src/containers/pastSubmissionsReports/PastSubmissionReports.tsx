import { Col, Row, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import protectedApiClient from '../../api/protectedApiClient';
import { Routes } from '../../App';
import { DirectoryTitle } from '../../components';
import { Container, Outer } from '../../components/form-style/FormContainer';
import Loading from '../../components/Loading';
import { C4CState } from '../../store';
import { LibraryReportResponse } from '../library-report/ducks/types';
import { PastSubmissionsSchoolsReducerState } from '../pastSubmissionsSchools/ducks/types';
import PastSubmissionActions from './PastSubmissionActions';

const PastSubmissionsReports: React.FC = () => {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const schoolId: PastSubmissionsSchoolsReducerState['pastSubmissionSelectedSchoolId'] = useSelector(
    (state: C4CState) =>
      state.pastSubmissionSchoolsState.pastSubmissionSelectedSchoolId,
  );

  if (!schoolId) {
    history.push(Routes.PAST_SUBMISSIONS_SCHOOLS);
    return <></>;
  }

  const { isLoading, error, data } = useQuery(
    ['pastSubmissionsReports', schoolId, currentPage],
    () => protectedApiClient.getPastSubmissionReports(schoolId, currentPage),
  );

  const columns: ColumnType<LibraryReportResponse>[] = [
    {
      title: 'Last Updated',
      dataIndex: 'updatedAt',
      sorter: {
        compare: (a, b) => a.updatedAt.localeCompare(b.updatedAt),
        multiple: 1,
      },
    },
    {
      title: 'Library Status',
      dataIndex: 'libraryStatus',
      sorter: {
        compare: (a, b) => a.libraryStatus.localeCompare(b.libraryStatus),
        multiple: 1,
      },
    },
    {
      title: 'School ID',
      dataIndex: 'schoolId',
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      sorter: {
        compare: (a, b) => (a.userId > b.userId ? 1 : -1),
        multiple: 1,
      },
    },
    {
      title: 'Actions',
      // eslint-disable-next-line react/display-name
      render: (report) => <PastSubmissionActions report={report} />,
    },
  ];

  const onPageChange = (page: any, pageSize: any) => {
    if (page !== currentPage && schoolId !== undefined && page !== undefined) {
      setCurrentPage(page);
    }
  };

  const convertToAtlanticTime = (localeString: string) => {
    return (
      new Date(localeString).toLocaleString('en-US', {
        timeZone: 'America/Argentina/Cordoba',
      }) + ' AST'
    );
  };

  return (
    <>
      {isLoading && <Loading title={'Past Submissions'} />}
      {error && <p>An error occurred loading past submissions</p>}
      {data && (
        <Container>
          <Row gutter={[0, 32]}>
            <Col flex={24}>
              <DirectoryTitle level={2}>Past Submissions</DirectoryTitle>
            </Col>
          </Row>
          <Outer>
            <Table
              dataSource={(data.reports || []).map((report) => {
                return {
                  ...report,
                  updatedAt: convertToAtlanticTime(report.updatedAt),
                  createdAt: convertToAtlanticTime(report.createdAt),
                };
              })}
              rowKey={(report) => report.libraryStatus + report.id}
              columns={columns}
              pagination={{
                current: currentPage,
                total: data.count,
                pageSize: 10,
                onChange: onPageChange,
              }}
            />
          </Outer>
        </Container>
      )}
    </>
  );
};

export default PastSubmissionsReports;

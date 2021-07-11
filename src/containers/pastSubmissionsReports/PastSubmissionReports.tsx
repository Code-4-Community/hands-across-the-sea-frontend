import React, { useEffect, useState } from 'react';
import { Container, Outer } from '../../components/form-style/FormContainer';
import { Col, Row, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { DirectoryTitle } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncRequest, AsyncRequestKinds } from '../../utils/asyncRequest';
import { C4CState } from '../../store';
import { getPastSubmissionsReports } from './ducks/thunks';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../App';
import { LibraryReportResponse } from '../library-report/ducks/types';
import { PastSubmissionsSchoolsReducerState } from '../pastSubmissionsSchools/ducks/types';
import Loading from '../../components/Loading';
import { ReportGenericListResponse } from './ducks/types';
import PastSubmissionActions from './PastSubmissionActions';

const PastSubmissionsReports: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const schoolId: PastSubmissionsSchoolsReducerState['pastSubmissionSelectedSchoolId'] = useSelector(
    (state: C4CState) =>
      state.pastSubmissionSchoolsState.pastSubmissionSelectedSchoolId,
  );

  useEffect(() => {
    if (schoolId !== undefined) {
      dispatch(getPastSubmissionsReports(schoolId, 1));
    } else {
      history.push(Routes.PAST_SUBMISSIONS_SCHOOLS);
    }
  }, [schoolId, dispatch, history]);

  const availableReports: AsyncRequest<
    ReportGenericListResponse,
    any
  > = useSelector(
    (state: C4CState) =>
      state.pastSubmissionReportsState.pastSubmissionsReports,
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
      render: (data) => <PastSubmissionActions report={data} />,
    },
  ];

  const onPageChange = (page: any, pageSize: any) => {
    if (page !== currentPage && schoolId !== undefined && page !== undefined) {
      dispatch(getPastSubmissionsReports(schoolId, page));
      setCurrentPage(page);
    }
  };

  switch (availableReports.kind) {
    case AsyncRequestKinds.NotStarted:
    case AsyncRequestKinds.Failed:
      return <p>An error occurred loading past submissions</p>;
    case AsyncRequestKinds.Loading:
      return <Loading title={'Past Submissions'} />;
    case AsyncRequestKinds.Completed:
      return (
        <Container>
          <Row gutter={[0, 32]}>
            <Col flex={24}>
              <DirectoryTitle level={2}>Past Submissions</DirectoryTitle>
            </Col>
          </Row>
          <Outer>
            <Table
              dataSource={availableReports.result.reports || []}
              rowKey={(data) => data.libraryStatus + data.id}
              columns={columns}
              pagination={{
                current: currentPage,
                total: availableReports.result.count,
                pageSize: 10,
                onChange: onPageChange,
              }}
            />
          </Outer>
        </Container>
      );
  }
};

export default PastSubmissionsReports;

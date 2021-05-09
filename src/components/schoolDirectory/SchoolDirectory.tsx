import React, { useEffect, useState } from 'react';
import { Container, Outer } from '../form-style/FormContainer';
import { Button, Col, Input, Modal, Row, Table } from 'antd';
import { SchoolEntry } from '../../containers/selectSchool/ducks/types';
import { ColumnType } from 'antd/lib/table';
import { DirectoryTitle } from '../index';
import CreateSchool from './CreateSchool';
import { SchoolRequest } from '../../containers/schoolInfo/ducks/types';
import { useDispatch, useSelector } from 'react-redux';
import { createSchoolRequest } from '../../containers/schoolInfo/ducks/thunks';
import { loadSchools } from '../../containers/selectSchool/ducks/thunks';
import { AsyncRequest, AsyncRequestKinds } from '../../utils/asyncRequest';
import { C4CState } from '../../store';
import Action from './Action';
import { deleteSchool } from '../../containers/schoolDirectory/ducks/thunks';

const { Search } = Input;

const sortStrings = (a: string, b: string): number => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

const SchoolDirectory: React.FC = () => {
  const [createSchool, setCreateSchool] = useState<boolean>(false);
  const [updateSchoolList, setUpdateSchoolList] = useState<boolean>(false);
  const dispatch = useDispatch();
  const availableSchools: AsyncRequest<SchoolEntry[], any> = useSelector(
    (state: C4CState) => state.selectSchoolState.schools,
  );

  // need useEffect inside of component because the state "updateSchoolList"
  // needs to be a dependency
  useEffect(() => {
    dispatch(loadSchools());
  }, [dispatch, updateSchoolList]);

  // handles submitting create a school form
  const handleOnFinishCreateSchool = (schoolInfo: SchoolRequest) => {
    dispatch(createSchoolRequest(schoolInfo));
    setCreateSchool(false);
    setUpdateSchoolList(!updateSchoolList);
  };

  // handles canceling the create school form
  const handleOnCancelCreateSchool = () => {
    setCreateSchool(false);
  };

  // handles the button click of Create School button
  const handleOnClickCreateSchool = () => {
    setCreateSchool(!createSchool);
  };

  // handles determining what action to do when an action is executed
  const handleActionButtonOnClick = ({ key }: any) => {
    const identifiers: string[] = key.split(';');
    if (identifiers[0] === 'edit') {
      return;
    } else if (identifiers[0] === 'books') {
      return;
    } else {
      dispatch(deleteSchool(parseInt(identifiers[1], 10)));
      setUpdateSchoolList(!updateSchoolList);
    }
  };

  const columns: ColumnType<SchoolEntry>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'id',
      sorter: {
        compare: (a, b) => sortStrings(a.name, b.name),
        multiple: 1,
      },
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'id',
      sorter: {
        compare: (a, b) => sortStrings(a.country, b.country),
        multiple: 1,
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      // eslint-disable-next-line react/display-name
      render: (record: SchoolEntry) => (
        <Action onClick={handleActionButtonOnClick} record={record} />
      ),
    },
  ];

  switch (availableSchools.kind) {
    case AsyncRequestKinds.NotStarted:
    case AsyncRequestKinds.Failed:
      return <p>An error occurred loading schools</p>;
    case AsyncRequestKinds.Loading:
    case AsyncRequestKinds.Completed:
      return (
        <Container>
          <Modal
            visible={createSchool}
            width={1000}
            footer={null}
            destroyOnClose
          >
            <CreateSchool
              onFinish={handleOnFinishCreateSchool}
              onCancel={handleOnCancelCreateSchool}
            />
          </Modal>
          <Row gutter={[0, 32]}>
            <Col flex={24}>
            <DirectoryTitle level={2}>School Directory</DirectoryTitle>
            </Col>
          </Row>
          <Row gutter={[48, 32]}>
            <Col flex={18}>
              <Search />
            </Col>
            <Col flex={6}>
              <Button onClick={handleOnClickCreateSchool}>Add School</Button>
            </Col>
          </Row>
          <Outer>
            <Table
              dataSource={
                availableSchools.kind === AsyncRequestKinds.Completed
                  ? availableSchools.result
                  : undefined
              }
              columns={columns}
              loading={availableSchools.kind === AsyncRequestKinds.Loading}
            />
          </Outer>
        </Container>
      );
  }
};

export default SchoolDirectory;

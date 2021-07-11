import React, { useEffect, useState } from 'react';
import { Container, Outer } from '../../components/form-style/FormContainer';
import { Button, Col, Input, Modal, Row, Table } from 'antd';
import { SchoolEntry } from '../selectSchool/ducks/types';
import { ColumnType } from 'antd/lib/table';
import { DirectoryTitle } from '../../components';
import CreateSchool from '../../components/schoolDirectory/CreateSchool';
import { SchoolRequest } from '../schoolInfo/ducks/types';
import { useDispatch, useSelector } from 'react-redux';
import { createSchoolRequest } from '../schoolInfo/ducks/thunks';
import { loadSchools } from '../selectSchool/ducks/thunks';
import { AsyncRequest, AsyncRequestKinds } from '../../utils/asyncRequest';
import { C4CState } from '../../store';
import SchoolDirectoryActionMenu, {
  SchoolDirectoryAction,
} from '../../components/schoolDirectory/SchoolDirectoryActionMenu';
import { deleteSchool } from './ducks/thunks';
import { Countries } from '../../utils/countries';

const { Search } = Input;

const SchoolDirectory: React.FC = () => {
  const [createSchool, setCreateSchool] = useState<boolean>(false);
  const [updateSchoolList, setUpdateSchoolList] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
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
  const handleActionButtonOnClick = (schoolId: number) => (
    key: SchoolDirectoryAction,
  ) => {
    switch (key) {
      case SchoolDirectoryAction.EDIT:
        return;
      case SchoolDirectoryAction.BOOKS:
        return;
      case SchoolDirectoryAction.DELETE:
        dispatch(deleteSchool(schoolId));
        setUpdateSchoolList(!updateSchoolList);
    }
  };

  const columns: ColumnType<SchoolEntry>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'id',
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 1,
      },
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'id',
      sorter: {
        compare: (a, b) => a.country.localeCompare(b.country),
        multiple: 1,
      },
      render(country: keyof typeof Countries) {
        return (
          <>{Countries[country]}</>
        )
      }
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render(record: SchoolEntry) {
        return (
          <SchoolDirectoryActionMenu
            onAction={handleActionButtonOnClick(record.id)}
          />
        );
      },
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
            destroyOnClose={true}
            onCancel={handleOnCancelCreateSchool}
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
              <Search onChange={(e) => setSearchText(e.target.value)} />
            </Col>
            <Col flex={6}>
              <Button onClick={handleOnClickCreateSchool}>Add School</Button>
            </Col>
          </Row>
          <Outer>
            <Table
              dataSource={
                availableSchools.kind === AsyncRequestKinds.Completed
                  ? availableSchools.result.filter((entry) =>
                      entry.name
                        .toLocaleLowerCase()
                        .startsWith(searchText.toLowerCase()),
                    )
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

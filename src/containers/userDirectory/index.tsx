import React, { useEffect, useState } from 'react';
import { Container, Outer } from '../../components/form-style/FormContainer';
import { Button, Col, Input, Modal, Row, Table } from 'antd';
import { SchoolEntry } from '../selectSchool/ducks/types';
import { ColumnType } from 'antd/lib/table';
import { DirectoryTitle } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncRequest, AsyncRequestKinds } from '../../utils/asyncRequest';
import { C4CState } from '../../store';
import UserDirectoryActionMenu, {
  UserDirectoryAction,
} from '../../components/userDirectory/UserDirectoryActionMenu';
import CreateUser from '../../components/userDirectory/CreateUser';
import { SignupRequest } from '../../auth/ducks/types';
import { signup } from '../../auth/ducks/thunks';
import protectedApiClient from '../../api/protectedApiClient';
import { GetAllUsersResponse } from './ducks/types';

const { Search } = Input;

const UserDirectory: React.FC = () => {
  const [createUser, setCreateUser] = useState<boolean>(false);
  const [updateUserList, setUpdateUserList] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const dispatch = useDispatch();
  const availableSchools: AsyncRequest<SchoolEntry[], any> = useSelector(
    (state: C4CState) => state.selectSchoolState.schools,
  );
  const [allUsers, setAllUsers] = useState<GetAllUsersResponse[]>();

  // need useEffect inside of component because the state "updateUserList"
  // needs to be a dependency
  useEffect(() => {
    protectedApiClient
      .getAllUsers()
      .then(setAllUsers)
      .catch((e) => e);
  }, [dispatch, updateUserList]);

  // handles submitting create a user form
  const handleOnFinishCreateUser = (userInfo: SignupRequest) => {
    dispatch(signup(userInfo));
    setCreateUser(false);
    setUpdateUserList(!updateUserList);
  };

  // handles canceling the create school form
  const handleOnCancelCreateUser = () => {
    setCreateUser(false);
  };

  // handles the button click of Create School button
  const handleOnClickCreateUser = () => {
    setCreateUser(!createUser);
  };

  // handles determining what action to do when an action is executed
  const handleActionButtonOnClick = () => (
    key: UserDirectoryAction,
  ) => {
    switch (key) {
      case UserDirectoryAction.EDIT:
        return;
      case UserDirectoryAction.DELETE:
        return;
    }
  };

  const columns: ColumnType<GetAllUsersResponse>[] = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'id',
      sorter: {
        compare: (a, b) => a.firstName.localeCompare(b.firstName),
        multiple: 1,
      },
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'id',
      sorter: {
        compare: (a, b) => a.lastName.localeCompare(b.lastName),
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
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'id',
      sorter: {
        compare: (a, b) => a.email.localeCompare(b.email),
        multiple: 1,
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render(record: GetAllUsersResponse) {
        return (
          <UserDirectoryActionMenu onAction={handleActionButtonOnClick} />
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
          <Modal visible={createUser} width={1000} footer={null} destroyOnClose>
            <CreateUser
              onFinish={handleOnFinishCreateUser}
              onCancel={handleOnCancelCreateUser}
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
              <Button onClick={handleOnClickCreateUser}>Add School</Button>
            </Col>
          </Row>
          <Outer>
            <Table dataSource={allUsers} columns={columns} />
          </Outer>
        </Container>
      );
  }
};

export default UserDirectory;

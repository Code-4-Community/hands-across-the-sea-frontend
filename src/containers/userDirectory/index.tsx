import React, { useEffect, useState } from 'react';
import { Container, Outer } from '../../components/form-style/FormContainer';
import { Button, Col, Input, Modal, Row, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { DirectoryTitle } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncRequestKinds } from '../../utils/asyncRequest';
import { C4CState } from '../../store';
import UserDirectoryActionMenu, {
  UserDirectoryAction,
} from '../../components/userDirectory/UserDirectoryActionMenu';
import CreateUser from '../../components/userDirectory/CreateUser';
import { SignupRequest } from '../../auth/ducks/types';
import {
  UpdateUserRequest,
  UserDirectoryReducerState,
  UserResponse,
} from './ducks/types';
import { loadAllUsers } from './ducks/thunks';
import authClient from '../../auth/authClient';
import protectedApiClient from '../../api/protectedApiClient';
import { notification } from 'antd/es';

const { Search } = Input;

const UserDirectory: React.FC = () => {
  const [createUser, setCreateUser] = useState<boolean>(false);
  const [updateUser, setUpdateUser] = useState<boolean>(false);
  /* Will be used when Update User endpoint is fixed
  const [defaultUser, setDefaultUser] = useState<UserResponse | undefined>(
    undefined,
  );
   */
  const [updateUserList, setUpdateUserList] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const dispatch = useDispatch();
  const availableUsers: UserDirectoryReducerState['allUsers'] = useSelector(
    (state: C4CState) => state.userDirectoryState.allUsers,
  );

  // need useEffect inside of component because the state "updateUserList"
  // needs to be a dependency
  useEffect(() => {
    dispatch(loadAllUsers());
  }, [dispatch, updateUserList]);

  // show error notification if any
  // should never reach this as we check validity before sending request
  const errorSignUp = (error: any) => {
    notification.warning({
      message: 'Error',
      description: error.response.data,
    });
  };

  // handles submitting create a user form
  const handleOnFinishCreateUser = (
    userInfo: SignupRequest | UpdateUserRequest,
    update: boolean,
  ) => {
    if (update) {
      protectedApiClient
        .updateUser(userInfo as UpdateUserRequest, 1)
        .then((ignore) => {
          setCreateUser(false);
          setUpdateUserList(!updateUserList);
        })
        .catch(errorSignUp);
    } else {
      authClient
        .signup(userInfo as SignupRequest)
        .then((ignore) => {
          setCreateUser(false);
          setUpdateUserList(!updateUserList);
        })
        .catch(errorSignUp);
    }
  };

  // handles canceling the create user form
  const handleOnCancelCreateUser = () => {
    setUpdateUser(false);
    setCreateUser(false);
  };

  // handles the button click of Create User button
  const handleOnClickCreateUser = () => {
    setCreateUser(!createUser);
  };

  // handles determining what action to do when an action is executed
  const handleActionButtonOnClick = (record: UserResponse) => (
    key: UserDirectoryAction,
  ) => {
    switch (key) {
      case UserDirectoryAction.EDIT:
        /* Set up for when Update User endpoint is updated
        setUpdateUser(true);
        setDefaultUser(record);
        setCreateUser(true);
        */
        return;
      case UserDirectoryAction.DELETE:
        return;
    }
  };

  const columns: ColumnType<UserResponse>[] = [
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
      title: 'Privilege',
      dataIndex: 'privilegeLevel',
      key: 'id',
      sorter: {
        compare: (a, b) =>
          a.privilegeLevel.valueOf().localeCompare(b.privilegeLevel.valueOf()),
        multiple: 1,
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render(record: UserResponse) {
        return (
          <UserDirectoryActionMenu
            onAction={handleActionButtonOnClick(record)}
          />
        );
      },
    },
  ];

  switch (availableUsers.kind) {
    case AsyncRequestKinds.NotStarted:
    case AsyncRequestKinds.Failed:
      return <p>An error occurred loading users</p>;
    case AsyncRequestKinds.Loading:
    case AsyncRequestKinds.Completed:
      return (
        <Container>
          <Modal visible={createUser} width={1000} footer={null} destroyOnClose>
            <CreateUser
              onFinish={handleOnFinishCreateUser}
              onCancel={handleOnCancelCreateUser}
              update={updateUser}
            />
          </Modal>
          <Row gutter={[0, 32]}>
            <Col flex={24}>
              <DirectoryTitle level={2}>User Directory</DirectoryTitle>
            </Col>
          </Row>
          <Row gutter={[48, 32]}>
            <Col flex={18}>
              <Search onChange={(e) => setSearchText(e.target.value)} />
            </Col>
            <Col flex={6}>
              <Button onClick={handleOnClickCreateUser}>Add User</Button>
            </Col>
          </Row>
          <Outer>
            <Table
              dataSource={
                availableUsers.kind === AsyncRequestKinds.Completed
                  ? Array.from(availableUsers.result.users).filter(
                      (entry) =>
                        entry.firstName
                          .toLocaleLowerCase()
                          .startsWith(searchText.toLowerCase()) ||
                        entry.lastName
                          .toLocaleLowerCase()
                          .startsWith(searchText.toLowerCase()),
                    )
                  : undefined
              }
              columns={columns}
              loading={availableUsers.kind === AsyncRequestKinds.Loading}
            />
          </Outer>
        </Container>
      );
  }
};

export default UserDirectory;

import React, { useEffect, useState } from 'react';
import { Container, Outer } from '../../components/form-style/FormContainer';
import { Button, Col, Input, message, Modal, Row, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { DirectoryTitle } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncRequestKinds } from '../../utils/asyncRequest';
import { C4CState } from '../../store';
import UserDirectoryActionMenu, {
  UserDirectoryAction,
} from '../../components/userDirectory/UserDirectoryActionMenu';
import CreateUser from '../../components/userDirectory/CreateUser';
import { PrivilegeLevel, SignupRequest } from '../../auth/ducks/types';
import {
  UpdateUserRequest,
  UserDirectoryReducerState,
  UserResponse,
} from './ducks/types';
import { loadAllUsers } from './ducks/thunks';
import authClient from '../../auth/authClient';
import protectedApiClient from '../../api/protectedApiClient';
import styled from 'styled-components';

const { Search } = Input;

const DisabledContainer = styled.div`
  color: red;
`;

const UserDirectory: React.FC = () => {
  const [createUser, setCreateUser] = useState<boolean>(false);
  const [updateUser, setUpdateUser] = useState<boolean>(false);
  const [defaultUser, setDefaultUser] = useState<UserResponse>({
    id: -1,
    firstName: '',
    lastName: '',
    email: '',
    privilegeLevel: PrivilegeLevel.NONE,
    country: 'DOMINICA',
    disabled: true,
  });
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
  const errorMessage = (error: string) => {
    message.warning(error);
  };

  // handles submitting create a user form
  const handleOnFinishCreateUser = (
    userInfo: SignupRequest | UpdateUserRequest,
    update: boolean,
  ) => {
    if (update) {
      protectedApiClient
        .updateUser(userInfo as UpdateUserRequest, defaultUser.id)
        .then((ignore) => {
          setCreateUser(false);
          setUpdateUser(false);
          setUpdateUserList(!updateUserList);
        })
        .catch(() => errorMessage('Updating user failed. Try again.'));
    } else {
      authClient
        .signup(userInfo as SignupRequest)
        .then((ignore) => {
          setCreateUser(false);
          setUpdateUserList(!updateUserList);
        })
        .catch(() => errorMessage('Signup request failed. Try again.'));
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
  const handleActionButtonOnClick =
    (record: UserResponse) => (key: UserDirectoryAction) => {
      switch (key) {
        case UserDirectoryAction.EDIT:
          setUpdateUser(true);
          setDefaultUser(record);
          setCreateUser(true);
          return;
        case UserDirectoryAction.ENABLE:
          protectedApiClient
            .enableUser(record.id)
            .then(() => setUpdateUserList(!updateUserList))
            .catch(() =>
              errorMessage(
                'You are not authenticated or the user does not exist.',
              ),
            );
          return;
        case UserDirectoryAction.DISABLE:
          protectedApiClient
            .disableUser(record.id)
            .then(() => setUpdateUserList(!updateUserList))
            .catch(() =>
              errorMessage(
                'You are not authenticated or the user does not exist.',
              ),
            );
          return;
        default:
          return;
      }
    };

  const renderDisabled = (value: any, record: UserResponse, index: number) => {
    if (record.disabled) {
      return <DisabledContainer>{value}</DisabledContainer>;
    }
    return <p>{value}</p>;
  };

  const convertEnumToRegularText = (input: string) => {
    return input
      .replaceAll('_', ' ')
      .toLowerCase()
      .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
  };

  const columns: ColumnType<UserResponse>[] = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      sorter: {
        compare: (a, b) => a.firstName.localeCompare(b.firstName),
        multiple: 1,
      },
      render: renderDisabled,
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      sorter: {
        compare: (a, b) => a.lastName.localeCompare(b.lastName),
        multiple: 1,
      },
      render: renderDisabled,
    },
    {
      title: 'Country',
      dataIndex: 'country',
      sorter: {
        compare: (a, b) => a.country.localeCompare(b.country),
        multiple: 1,
      },
      render(input: string) {
        return convertEnumToRegularText(input);
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: {
        compare: (a, b) => a.email.localeCompare(b.email),
        multiple: 1,
      },
      render: renderDisabled,
    },
    {
      title: 'Privilege',
      dataIndex: 'privilegeLevel',
      sorter: {
        compare: (a, b) =>
          a.privilegeLevel.valueOf().localeCompare(b.privilegeLevel.valueOf()),
        multiple: 1,
      },
      render(input: string) {
        return convertEnumToRegularText(input);
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      // need key because no dataindex
      key: 'action',
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
              defaultUser={updateUser ? defaultUser : undefined}
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

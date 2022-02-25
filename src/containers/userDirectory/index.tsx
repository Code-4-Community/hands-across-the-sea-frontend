import { Button, Col, Input, message, Modal, Row, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import protectedApiClient from '../../api/protectedApiClient';
import authClient from '../../auth/authClient';
import { PrivilegeLevel, SignupRequest } from '../../auth/ducks/types';
import { DirectoryTitle } from '../../components';
import BackButton from '../../components/BackButton';
import { Container, Outer } from '../../components/form-style/FormContainer';
import CreateUser from '../../components/userDirectory/CreateUser';
import UserDirectoryActionMenu, {
  UserDirectoryAction,
} from '../../components/userDirectory/UserDirectoryActionMenu';
import getColorPalette from '../../utils/colors';
import { UpdateUserRequest, UserResponse } from './types';

const { Search } = Input;

const DisabledContainer = styled.div`
  color: ${getColorPalette().disabled};
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

  const { isLoading, error, data } = useQuery(
    'users',
    protectedApiClient.getAllUsers,
  );

  // show error notification if any
  // should never reach this as we check validity before sending request
  const errorMessage = (msg: string) => {
    message.warning(msg);
  };

  // handles submitting create a user form
  const handleOnFinishCreateUser = (
    userInfo: SignupRequest | UpdateUserRequest,
    update: boolean,
  ) => {
    if (update) {
      protectedApiClient
        .updateUser(userInfo as UpdateUserRequest, defaultUser.id)
        .then(() => {
          setCreateUser(false);
          setUpdateUser(false);
          setUpdateUserList(!updateUserList);
        })
        .catch(() => errorMessage('Updating user failed. Try again.'));
    } else {
      authClient
        .signup(userInfo as SignupRequest)
        .then(() => {
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
      render: renderDisabled,
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
      render: renderDisabled,
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

  return (
    <>
      {error && <p>An error occurred loading users</p>}
      {!error && (
        <Container>
          <BackButton />
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
                data &&
                data.users.filter(
                  (entry) =>
                    entry.firstName
                      .toLocaleLowerCase()
                      .startsWith(searchText.toLowerCase()) ||
                    entry.lastName
                      .toLocaleLowerCase()
                      .startsWith(searchText.toLowerCase()),
                )
              }
              columns={columns}
              loading={isLoading}
            />
          </Outer>
        </Container>
      )}
    </>
  );
};

export default UserDirectory;

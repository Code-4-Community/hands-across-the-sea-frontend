import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button, Descriptions, Form, Input } from 'antd';
import ProtectedApiClient from '../../api/protectedApiClient';
import { Container, DirectoryTitle, Outer } from '../../components';
import FormPiece from '../../components/form-style/FormPiece';
import { GetUserResponse } from './ducks/types';
import { useSelector } from 'react-redux';
import { C4CState } from '../../store';
import { getUserID } from '../../auth/ducks/selectors';
import { Countries } from '../../utils/countries';
import BackButton from '../../components/BackButton';

const Settings: React.FC = () => {
  const userId = useSelector((state: C4CState) => {
    return getUserID(state.authenticationState.tokens);
  });
  const [userInfo, setUserInfo] = useState<GetUserResponse>(
    {} as GetUserResponse,
  );

  useEffect(() => {
    ProtectedApiClient.getUser()
      .then(setUserInfo)
      .catch((e) => e);
  }, [userId]);

  const onFinishChangePassword = (values: any) => {
    const { newPassword, currentPassword } = values;

    ProtectedApiClient.changePassword({
      newPassword,
      currentPassword,
    })
      .then((res) => res)
      .catch((e) => e);
  };

  return (
    <>
      <Helmet>
        <title>Your Profile</title>
      </Helmet>
      <Container>
        <BackButton />
        <DirectoryTitle level={2}>Your Profile</DirectoryTitle>
        <Outer>
          <FormPiece note="Personal Info" titleLevel={4}>
            <Descriptions column={1}>
              <Descriptions.Item label="First Name">
                {userInfo.firstName}
              </Descriptions.Item>
              <Descriptions.Item label="Last Name">
                {userInfo.lastName}
              </Descriptions.Item>
              <Descriptions.Item label="Country">
                {Countries[userInfo.country]}
              </Descriptions.Item>
              <Descriptions.Item label="Privilege Level">
                {userInfo.privilegeLevel}
              </Descriptions.Item>
            </Descriptions>
          </FormPiece>
          <FormPiece note="Change Password" lastPiece titleLevel={4}>
            <Form name="basic" onFinish={onFinishChangePassword}>
              <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[
                  {
                    required: true,
                    message: 'Please input your current password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: 'Please input your new password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['newPassword']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        'The two passwords that you entered do not match!',
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Change Password
                </Button>
              </Form.Item>
            </Form>
          </FormPiece>
        </Outer>
      </Container>
    </>
  );
};

export default Settings;

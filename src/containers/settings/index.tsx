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

const Settings: React.FC = () => {
  const userID: number = useSelector((state: C4CState) => {
    return getUserID(state.authenticationState.tokens);
  });
  const [userInfo, setUserInfo] = useState<GetUserResponse>(
    {} as GetUserResponse,
  );

  useEffect(() => {
    ProtectedApiClient.getUser()
      .then((res) => setUserInfo(res))
      .catch((e) => e);
  }, [userID]);

  const onFinishChangePassword = (values: any) => {
    ProtectedApiClient.changePassword(values)
      .then((res) => res)
      .catch((e) => e);
  };

  return (
    <>
      <Helmet>
        <title>Your Profile</title>
      </Helmet>
      <Container>
        <DirectoryTitle level={2}>Your Profile</DirectoryTitle>
        <Outer>
          <FormPiece note="Personal Info" level={4}>
            <Descriptions column={1}>
              <Descriptions.Item label="First Name">
                {userInfo.firstName}
              </Descriptions.Item>
              <Descriptions.Item label="Last Name">
                {userInfo.lastName}
              </Descriptions.Item>
              <Descriptions.Item label="Country">
                {userInfo.country}
              </Descriptions.Item>
            </Descriptions>
          </FormPiece>
          <FormPiece note="Change Password" lastPiece level={4}>
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
                      if (!value || getFieldValue('password') === value) {
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

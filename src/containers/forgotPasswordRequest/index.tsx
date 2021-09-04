import React from 'react';
import { Helmet } from 'react-helmet';
import { Button, Col, Form, Input, Row } from 'antd';
import authClient from '../../auth/authClient';
import { ForgotPasswordRequest } from '../../auth/ducks/types';
import BlockContainer from '../../components/login-signup/BlockContainer';

const ForgotPassword: React.FC = () => {
  const onFinish = (values: ForgotPasswordRequest) => {
    authClient
      .forgotPassword(values)
      .then(() => {
        alert('Successfully sent forgot password request!');
      })
      .catch((err) => {
        alert('Forgot password request unsuccessful!');
      });
  };
  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <div className="content-container">
        <BlockContainer title="Forgot Password">
          <Form name="basic" onFinish={onFinish}>
            <Row gutter={[0, 24]}>
              <Col span={24}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input a valid email.',
                      pattern: RegExp('^\\S+@\\S+\\.\\S{2,}$'),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </BlockContainer>
      </div>
    </>
  );
};

export default ForgotPassword;

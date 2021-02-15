import React from 'react';
import { Helmet } from 'react-helmet';
import { Button, Form, Input, Typography, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { login } from '../../auth/ducks/thunks';
import { connect, useDispatch } from 'react-redux';
import { AsyncRequestKinds } from '../../utils/asyncRequest';
import { C4CState } from '../../store';
import { UserAuthenticationReducerState } from '../../auth/ducks/types';
import LoginContainer from '../../components/login-signup/LoginContainer';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

const SubmitButton = styled(Button)`
  border-radius: 5px;
  width: 192px;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubText = styled(Paragraph)`
  font-size: 12px;
  font-weight: 400;
  color: #767a7d;
`;

type LoginProps = UserAuthenticationReducerState;

const Login: React.FC<LoginProps> = ({ tokens }) => {
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    dispatch(login({ email: values.email, password: values.password }));
  };
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <div className="content-container">
        <LoginContainer>
          <Form name="login" onFinish={onFinish}>
            <Row>
              <Col span={24}>
                <Paragraph>Email:</Paragraph>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: 'Please input your email!' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Paragraph>Password:</Paragraph>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
            {/*
            <Paragraph>
              Need an account? Sign up{' '}
              <Link to="/signup" component={Typography.Link}>
                here
              </Link>
              !
            </Paragraph>
            <Paragraph>
              Forgot your password? Click{' '}
              <Link to="/" component={Typography.Link}>
                here
              </Link>{' '}
            to reset it.
            </Paragraph>
            */}
            {tokens.kind === AsyncRequestKinds.Failed && (
              <Paragraph>{tokens.error}</Paragraph>
            )}
            <Row>
              <Col span={24}>
                <Form.Item>
                  <Center>
                    <SubmitButton type="primary" htmlType="submit">
                      Submit
                    </SubmitButton>
                  </Center>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Center>
                  <Link to="/not-found" component={Typography.Link}>
                    <SubText>Trouble logging in?</SubText>
                  </Link>
                </Center>
              </Col>
            </Row>
          </Form>
        </LoginContainer>
      </div>
    </>
  );
};

const mapStateToProps = (state: C4CState): LoginProps => {
  return {
    tokens: state.authenticationState.tokens,
  };
};

export default connect(mapStateToProps)(Login);

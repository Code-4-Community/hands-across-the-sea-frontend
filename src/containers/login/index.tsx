import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Button, Form, Input, Typography, Row, Col } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../../auth/ducks/thunks';
import { connect, useDispatch } from 'react-redux';
import { AsyncRequestKinds } from '../../utils/asyncRequest';
import { C4CState } from '../../store';
import BlockContainer from '../../components/login-signup/BlockContainer';
import styled from 'styled-components';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';
import { Routes } from '../../App';
import {
  PrivilegeLevel,
  UserAuthenticationReducerState,
  LoginRequest,
} from '../../auth/ducks/types';

const { Paragraph } = Typography;

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
  const history = useHistory();

  const onFinish = (values: LoginRequest): void => {
    dispatch(login(values));
  };

  useEffect(() => {
    if (getPrivilegeLevel(tokens) !== PrivilegeLevel.NONE) {
      history.push(Routes.HOME);
    }
  }, [tokens, history]);

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="Login" content="Login in to your account to start filling out reports." />
      </Helmet>
      <BlockContainer title="Login">
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
                <Link
                  to={Routes.FORGOT_PASSWORD_REQUEST}
                  component={Typography.Link}
                >
                  <SubText>Trouble logging in?</SubText>
                </Link>
              </Center>
            </Col>
          </Row>
        </Form>
      </BlockContainer>
    </>
  );
};

const mapStateToProps = (state: C4CState): LoginProps => {
  return {
    tokens: state.authenticationState.tokens,
  };
};

export default connect(mapStateToProps)(Login);

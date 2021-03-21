import React from 'react';
import { Helmet } from 'react-helmet';
import { Button, Form, Input, Select, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { signup } from '../../auth/ducks/thunks';
import { connect, useDispatch, useSelector } from 'react-redux';
import { C4CState } from '../../store';
import { useHistory } from 'react-router-dom';
import {
  PrivilegeLevel,
  SignupRequest,
  UserAuthenticationReducerState,
} from '../../auth/ducks/types';
import { AsyncRequestKinds } from '../../utils/asyncRequest';
import { ContentContainer } from '../../components';
import { Countries } from '../../utils/countries';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';
import { Routes } from '../../App';

const { Title, Paragraph } = Typography;

type SignupProps = UserAuthenticationReducerState;

const Signup: React.FC<SignupProps> = ({ tokens }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const privilegeLevel: PrivilegeLevel = useSelector((state: C4CState) =>
    getPrivilegeLevel(state.authenticationState.tokens),
  );

  if (privilegeLevel !== PrivilegeLevel.NONE) {
    history.push(Routes.HOME);
  }

  const onFinish = (values: SignupRequest) => {
    dispatch(
      signup({
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        country: values.country,
      }),
    );
  };

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <ContentContainer>
        <Title>Sign Up</Title>
        <Form name="basic" onFinish={onFinish}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Select placeholder="Select a country">
              {(Object.keys(Countries) as (keyof typeof Countries)[]).map(
                (country) => (
                  <Select.Option value={country} key={country}>
                    {Countries[country]}
                  </Select.Option>
                ),
              )}
            </Select>
          </Form.Item>

          <Paragraph>
            Already have an account? Log in{' '}
            <Link to="/login" component={Typography.Link}>
              here
            </Link>
            !
          </Paragraph>

          {tokens.kind === AsyncRequestKinds.Failed && (
            <Paragraph>{tokens.error}</Paragraph>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </ContentContainer>
    </>
  );
};

const mapStateToProps = (state: C4CState): SignupProps => {
  return {
    tokens: state.authenticationState.tokens,
  };
};

export default connect(mapStateToProps)(Signup);

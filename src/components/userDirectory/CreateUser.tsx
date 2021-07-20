import React from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import FormContainer from '../form-style/FormContainer';
import FormPiece from '../form-style/FormPiece';
import styled from 'styled-components';
import { Countries } from '../../utils/countries';
import { SignupRequest, UserPrivilegeLevel } from '../../auth/ducks/types';
import { UserResponse } from '../../containers/userDirectory/ducks/types';

const { Option } = Select;

interface CreateUserProps {
  readonly onFinish: (userInfoRequest: SignupRequest, update: boolean) => void;
  readonly onCancel: () => void;
  readonly update: boolean;
  readonly defaultUser?: UserResponse;
}

const Footer = styled.div`
  text-align: center;
  margin: 24px 0px 0px 0px;
`;
const SubmitButton = styled(Button)`
  width: 200px;
`;

const CreateUser: React.FC<CreateUserProps> = ({
  onFinish,
  onCancel,
  update,
  defaultUser,
}) => {
  return (
    <Form
      onFinish={(formObject: SignupRequest) => {
        onFinish(formObject, update);
      }}
      initialValues={defaultUser}
    >
      <FormContainer title="">
        <Row gutter={[0, 24]}>
          <Col flex={24}>
            <FormPiece note="Create A User" lastPiece>
              <Row gutter={[24, 24]}>
                <Col flex={12}>
                  <Form.Item
                    name="firstName"
                    rules={[{ required: true, message: 'Cannot be blank!' }]}
                  >
                    <Input required placeholder="First Name" />
                  </Form.Item>
                </Col>
                <Col flex={12}>
                  <Form.Item
                    name="lastName"
                    rules={[{ required: true, message: 'Cannot be blank!' }]}
                  >
                    <Input required placeholder="Last Name" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[24, 24]}>
                <Col flex={update ? 24 : 12}>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Must be a valid email!',
                        pattern: RegExp('^\\S+@\\S+\\.\\S{2,}$'),
                      },
                    ]}
                  >
                    <Input required placeholder="Email Address" />
                  </Form.Item>
                </Col>
                {!update && (
                  <Col flex={12}>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message:
                            'Password must contain 8-20 characters and at least 1 capital letter, number and symbol.',
                          pattern: RegExp(
                            '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&-+=()])(?=\\S+$).{8,20}$',
                          ),
                        },
                      ]}
                    >
                      <Input.Password placeholder="Password" />
                    </Form.Item>
                  </Col>
                )}
              </Row>
              <Row gutter={[0, 24]}>
                <Col flex={24}>
                  <Form.Item
                    name="country"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Select placeholder="School's Country">
                      {Object.keys(Countries).map((key: string) => (
                        <Option key={key} value={key}>
                          {key}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              {update && (
                <Row gutter={[0, 24]}>
                  <Col flex={24}>
                    <Form.Item
                      name="privilegeLevel"
                      rules={[{ required: true, message: 'Required' }]}
                    >
                      <Select placeholder="User's Privilege">
                        {Object.keys(UserPrivilegeLevel).map((key: string) => (
                          <Option key={key} value={key}>
                            {key}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              )}
            </FormPiece>
          </Col>
        </Row>
      </FormContainer>
      <Footer>
        <Row gutter={[0, 24]}>
          <Col flex={12}>
            <SubmitButton onClick={onCancel}>Cancel</SubmitButton>
          </Col>
          <Col flex={12}>
            <SubmitButton htmlType={'submit'}>Confirm</SubmitButton>
          </Col>
        </Row>
      </Footer>
    </Form>
  );
};

export default CreateUser;

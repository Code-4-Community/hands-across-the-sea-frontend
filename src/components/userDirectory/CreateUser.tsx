import React from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import FormContainer from '../form-style/FormContainer';
import FormPiece from '../form-style/FormPiece';
import styled from 'styled-components';
import { Countries } from '../../utils/countries';
import { SignupRequest } from '../../auth/ducks/types';

const { Option } = Select;

interface CreateUserProps {
  readonly onFinish: (userInfoRequest: SignupRequest) => void;
  readonly onCancel: () => void;
}

const Footer = styled.div`
  text-align: center;
  margin: 24px 0px 0px 0px;
`;
const SubmitButton = styled(Button)`
  width: 200px;
`;

const CreateUser: React.FC<CreateUserProps> = ({ onFinish, onCancel }) => {
  return (
    <Form onFinish={onFinish}>
      <FormContainer title="">
        <Row gutter={[0, 24]}>
          <Col flex={24}>
            <FormPiece note="Create A User" lastPiece>
              <Row gutter={[24, 24]}>
                <Col flex={12}>
                  <Form.Item
                    name="firstName"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                </Col>
                <Col flex={12}>
                  <Form.Item
                    name="lastName"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[24, 24]}>
                <Col flex={12}>
                  <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Input placeholder="Email Address" />
                  </Form.Item>
                </Col>
                <Col flex={12}>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                </Col>
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
            </FormPiece>
          </Col>
        </Row>
      </FormContainer>
      <Footer>
        <Row gutter={[0, 24]}>
          <Col flex={12}>
            <SubmitButton
              onClick={() => {
                onCancel();
              }}
            >
              Cancel
            </SubmitButton>
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

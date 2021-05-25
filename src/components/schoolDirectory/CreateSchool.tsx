import React from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { FormTextArea } from '../';
import FormContainer from '../form-style/FormContainer';
import FormPiece from '../form-style/FormPiece';
import { SchoolRequest } from '../../containers/schoolInfo/ducks/types';
import styled from 'styled-components';
import { Countries } from '../../utils/countries';
import { LibraryStatus } from '../../utils/libraryStatus';

const { Option } = Select;

interface CreateSchoolProps {
  readonly onFinish: (schoolInfoRequest: SchoolRequest) => void;
  readonly onCancel: () => void;
}

const Footer = styled.div`
  text-align: center;
  margin: 24px 0px 0px 0px;
`;
const SubmitButton = styled(Button)`
  width: 200px;
`;

const CreateSchool: React.FC<CreateSchoolProps> = ({ onFinish, onCancel }) => {
  return (
    <Form onFinish={onFinish}>
      <FormContainer title="">
        <Row gutter={[0, 24]}>
          <Col flex={24}>
            <FormPiece note="Create A School">
              <Form.Item name="name">
                <Input placeholder="School Name" />
              </Form.Item>
              <Form.Item name="address">
                <Input placeholder="Street Address" />
              </Form.Item>
              <Form.Item name="area">
                <Input placeholder="Town or District" />
              </Form.Item>
              <Form.Item name="email">
                <Input placeholder="Email Address" />
              </Form.Item>
              <Form.Item name="phone">
                <Input placeholder="Phone Number" />
              </Form.Item>
              <Form.Item name="country">
                <Select placeholder="School's Country">
                  {Object.keys(Countries).map((key: string) => (
                    <Option key={key} value={key}>
                      {key}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="libraryStatus">
                <Select placeholder="Library Status">
                  {Object.keys(LibraryStatus).map((key: string) => (
                    <Option key={key} value={key}>
                      {key}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="hidden">
                <Select placeholder="Hidden?">
                  <Option value="true">True</Option>
                  <Option value="false">False</Option>
                </Select>
              </Form.Item>
              <Form.Item name="notes">
                <FormTextArea
                  minLength={2}
                  placeholder="Any Specific Instructions?"
                />
              </Form.Item>
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

export default CreateSchool;

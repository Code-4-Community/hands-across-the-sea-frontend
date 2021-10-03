import React from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { FormTextArea } from '../';
import FormContainer from '../form-style/FormContainer';
import FormPiece from '../form-style/FormPiece';
import {
  SchoolRequest,
  SchoolResponse,
} from '../../containers/schoolInfo/types';
import styled from 'styled-components';
import { Countries } from '../../utils/countries';
import { LibraryStatus } from '../../utils/libraryStatus';
import { convertEnumToRegularText } from '../../utils/helpers';

const { Option } = Select;

interface CreateSchoolProps {
  readonly onFinish: (schoolInfoRequest: SchoolRequest, id: number) => void;
  readonly onCancel: () => void;
  readonly update: boolean;
  readonly defaultSchool?: SchoolResponse | undefined;
}

const Footer = styled.div`
  text-align: center;
  margin: 24px 0px 0px 0px;
`;
const SubmitButton = styled(Button)`
  width: 200px;
`;

const CreateSchool: React.FC<CreateSchoolProps> = ({
  onFinish,
  onCancel,
  update,
  defaultSchool,
}) => {
  return (
    <Form
      onFinish={(school: SchoolRequest) => {
        onFinish(school, defaultSchool?.id || -1);
      }}
      initialValues={update ? defaultSchool : {}}
    >
      <FormContainer title="">
        <Row gutter={[0, 24]}>
          <Col flex={24}>
            <FormPiece
              note={update ? 'Edit ' + defaultSchool?.name : 'Create A School'}
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Input placeholder="School Name*" />
              </Form.Item>
              <Form.Item
                name="address"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Input placeholder="Street Address*" />
              </Form.Item>
              <Form.Item
                name="area"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Input placeholder="Town or District*" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Required',
                    pattern: RegExp('^\\S+@\\S+\\.\\S{2,}$'),
                  },
                ]}
              >
                <Input placeholder="Email Address*" />
              </Form.Item>
              <Form.Item
                name="phone"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Input placeholder="Phone Number*" />
              </Form.Item>
              <Form.Item
                name="country"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Select placeholder="School's Country*">
                  {Object.keys(Countries).map((key: string) => (
                    <Option key={key} value={key}>
                      {convertEnumToRegularText(key)}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="libraryStatus"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Select placeholder="Library Status*">
                  {Object.keys(LibraryStatus).map((key: string) => (
                    <Option key={key} value={key}>
                      {convertEnumToRegularText(key)}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="hidden"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Select placeholder="Hidden?*">
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

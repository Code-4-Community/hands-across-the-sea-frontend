import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { FormTextArea } from '../';
import FormContainer from '../form-style/FormContainer';
import FormPiece from '../form-style/FormPiece';
import {
  SchoolRequest,
  SchoolResponse,
} from '../../containers/schoolInfo/ducks/types';
import styled from 'styled-components';
import { Countries } from '../../utils/countries';
import { LibraryStatus } from '../../utils/libraryStatus';

const { Option } = Select;

interface SchoolInformationFormProps {
  readonly onFinish: (
    schoolInfoRequest: SchoolRequest,
    editMade: boolean,
  ) => void;
  readonly defaultSchoolInformation?: SchoolResponse;
}

const Footer = styled.div`
  text-align: center;
  margin: 24px 0px 0px 0px;
`;
const SubmitButton = styled(Button)`
  width: 200px;
`;

const SchoolInformationForm: React.FC<SchoolInformationFormProps> = ({
  onFinish,
  defaultSchoolInformation,
}) => {
  const [editMode, setEditMode] = useState<boolean>(!defaultSchoolInformation);

  return (
    <Form
      onFinish={(form: SchoolRequest) => onFinish(form, editMode)}
      initialValues={defaultSchoolInformation}
    >
      <FormContainer title="School Information">
        <Row gutter={[0, 24]}>
          <Col flex={24}>
            <FormPiece note="School Information">
              <Form.Item name="name">
                <Input disabled={!editMode} placeholder="School Name" />
              </Form.Item>
              <Form.Item name="address">
                <Input disabled={!editMode} placeholder="Street Address" />
              </Form.Item>
              <Form.Item name="area">
                <Input disabled={!editMode} placeholder="Town or District" />
              </Form.Item>
              <Form.Item name="email">
                <Input disabled={!editMode} placeholder="Email Address" />
              </Form.Item>
              <Form.Item name="phone">
                <Input disabled={!editMode} placeholder="Phone Number" />
              </Form.Item>
              <Form.Item name="country">
                <Select disabled={!editMode} placeholder="School's Country">
                  {Object.keys(Countries).map((key: string) => (
                    <Option key={key} value={key}>
                      {key}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="libraryStatus">
                <Select disabled={!editMode} placeholder="Library Status">
                  {Object.keys(LibraryStatus).map((key: string) => (
                    <Option key={key} value={key}>
                      {key}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="notes">
                <FormTextArea
                  disabled={!editMode}
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
            {editMode ? (
              <SubmitButton
                onClick={() => {
                  setEditMode(false);
                }}
              >
                Cancel
              </SubmitButton>
            ) : (
              <SubmitButton
                onClick={() => {
                  setEditMode(true);
                }}
              >
                Edit
              </SubmitButton>
            )}
          </Col>
          <Col flex={12}>
            <SubmitButton htmlType={'submit'}>Confirm</SubmitButton>
          </Col>
        </Row>
      </Footer>
    </Form>
  );
};

export default SchoolInformationForm;

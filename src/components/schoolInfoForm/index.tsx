import React, { useState } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { FormTextArea } from '../';
import FormContainer from '../form-style/FormContainer';
import FormPiece from '../form-style/FormPiece';
import {
  SchoolRequest,
  SchoolResponse,
} from '../../containers/schoolInfo/ducks/types';
import styled from 'styled-components';

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
            <FormPiece note="School Address">
              <Form.Item name="address">
                <Input disabled={!editMode} placeholder="Street Address" />
              </Form.Item>
              <Form.Item name="area">
                <Input disabled={!editMode} placeholder="Town or District" />
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

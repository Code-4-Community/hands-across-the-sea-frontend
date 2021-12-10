import React, { useEffect, useState } from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import { FormTextArea } from '../../components';
import FormContainer from '../../components/form-style/FormContainer';
import FormPiece from '../../components/form-style/FormPiece';
import { SchoolRequest, SchoolResponse } from './types';
import { Countries } from '../../utils/countries';
import { LibraryStatus } from '../../utils/libraryStatus';
import FormButtons from '../../components/form-style/FormButtons';
import { useHistory } from 'react-router-dom';
import { InputLabel } from '../../components/index';

const { Option } = Select;

interface SchoolInformationFormProps {
  readonly onFinish: (
    schoolInfoRequest: SchoolRequest,
    editMade: boolean,
  ) => void;
  readonly defaultSchoolInformation?: SchoolResponse;
}

const SchoolInformationForm: React.FC<SchoolInformationFormProps> = ({
  onFinish,
  defaultSchoolInformation,
}) => {
  const [editMode, setEditMode] = useState<boolean>(!defaultSchoolInformation);
  const history = useHistory();
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(defaultSchoolInformation);
  }, [form, defaultSchoolInformation]);

  const goPrev = () => {
    history.push('/select-school');
  };

  return (
    <Form
      onFinish={(req: SchoolRequest) => onFinish(req, editMode)}
      form={form}
    >
      <FormContainer title="School Information">
        <Row gutter={[0, 24]}>
          <Col flex={24}>
            <FormPiece note="Name">
              <InputLabel>School Name</InputLabel>
              <Form.Item name="name">
                <Input disabled={!editMode} placeholder="School Name" />
              </Form.Item>
            </FormPiece>
            <FormPiece note="Address">
              <InputLabel>Street Address</InputLabel>
              <Form.Item name="address">
                <Input disabled={!editMode} placeholder="Street Address" />
              </Form.Item>
              <InputLabel>Town or District</InputLabel>
              <Form.Item name="area">
                <Input disabled={!editMode} placeholder="Town or District" />
              </Form.Item>
              <InputLabel>School's Country</InputLabel>
              <Form.Item name="country">
                <Select disabled={!editMode} placeholder="School's Country">
                  {Object.entries(Countries).map(([key, value]) => (
                    <Option key={key} value={key}>
                      {value}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </FormPiece>
            <FormPiece note="Contact Information">
              <InputLabel>Email Address</InputLabel>
              <Form.Item name="email">
                <Input disabled={!editMode} placeholder="Email Address" />
              </Form.Item>
              <InputLabel>Phone Number</InputLabel>
              <Form.Item name="phone">
                <Input disabled={!editMode} placeholder="Phone Number" />
              </Form.Item>
              <InputLabel>Library Status</InputLabel>
              <Form.Item name="libraryStatus">
                <Select disabled={!editMode} placeholder="Library Status">
                  {Object.entries(LibraryStatus).map(([key, value]) => (
                    <Option key={key} value={key}>
                      {value}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <InputLabel>Any Specific Instructions?</InputLabel>
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
      <FormButtons>
        <FormButtons.Button text="Back" type="secondary" onClick={goPrev} />
        {editMode ? (
          <FormButtons.Button
            type="secondary"
            text="Cancel"
            onClick={() => {
              setEditMode(false);
              form.setFieldsValue(defaultSchoolInformation);
            }}
          />
        ) : (
          <FormButtons.Button
            text="Edit"
            type="secondary"
            onClick={() => {
              setEditMode(true);
            }}
          />
        )}
        <FormButtons.Button text="Confirm" type="primary" isSubmit />
      </FormButtons>
    </Form>
  );
};

export default SchoolInformationForm;

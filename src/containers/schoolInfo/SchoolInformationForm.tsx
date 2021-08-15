import React, { useState } from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import { FormTextArea } from '../../components';
import FormContainer from '../../components/form-style/FormContainer';
import FormPiece from '../../components/form-style/FormPiece';
import { SchoolRequest, SchoolResponse } from './ducks/types';
import { Countries } from '../../utils/countries';
import { LibraryStatus } from '../../utils/libraryStatus';
import FormButtons from '../../components/form-style/FormButtons';
import { useHistory } from 'react-router-dom';

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

  const goPrev = () => {
    history.push('/select-school');
  };

  return (
    <Form
      onFinish={(form: SchoolRequest) => onFinish(form, editMode)}
      initialValues={defaultSchoolInformation}
    >
      <FormContainer title="School Information">
        <Row gutter={[0, 24]}>
          <Col flex={24}>
            <FormPiece note="Name">
              <Form.Item name="name" rules={[{ required: true, message: 'Required' }]}>
                <Input disabled={!editMode} placeholder="School Name*" />
              </Form.Item>
            </FormPiece>
            <FormPiece note="Address">
              <Form.Item name="address" rules={[{ required: true, message: 'Required' }]}>
                <Input disabled={!editMode} placeholder="Street Address*" />
              </Form.Item>
              <Form.Item name="area" rules={[{ required: true, message: 'Required' }]}>
                <Input disabled={!editMode} placeholder="Town or District*" />
              </Form.Item>
              <Form.Item name="country" rules={[{ required: true, message: 'Required' }]}>
                <Select disabled={!editMode} placeholder="School's Country*">
                  {Object.entries(Countries).map(([key, value]) => (
                    <Option key={key} value={key}>
                      {value}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </FormPiece>
            <FormPiece note="Contact Information">
              <Form.Item name="email" rules={[
                      {
                        required: true,
                        message: 'Required',
                        pattern: RegExp('^\\S+@\\S+\\.\\S{2,}$'),
                      }]}>
                <Input disabled={!editMode} placeholder="Email Address*" />
              </Form.Item>
              <Form.Item name="phone" rules={[{ required: true, message: 'Required' }]}>
                <Input disabled={!editMode} placeholder="Phone Number*" />
              </Form.Item>
              <Form.Item name="libraryStatus" rules={[{ required: true, message: 'Required' }]}> 
                <Select disabled={!editMode} placeholder="Library Status*">
                  {Object.entries(LibraryStatus).map(([key, value]) => (
                    <Option key={key} value={key}>
                      {value}
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
      <FormButtons>
        <FormButtons.Button text="Back" type="secondary" onClick={goPrev} />
        {editMode ? (
          <FormButtons.Button
            type="secondary"
            text="Cancel"
            onClick={() => {
              setEditMode(false);
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

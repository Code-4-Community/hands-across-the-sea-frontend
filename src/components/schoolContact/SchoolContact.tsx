import {
  ContactType,
  SchoolContactRequest,
  SchoolContactResponse,
} from '../../containers/schoolContact/ducks/types';
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Row, Select } from 'antd';
import FormPiece from '../form-style/FormPiece';

interface SchoolContactProps {
  initialSchoolContact?: SchoolContactResponse;
  suggestedContactType?: ContactType;
  onSubmit: (c: SchoolContactRequest) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isFirst?: boolean;
}

const SchoolContact: React.FC<SchoolContactProps> = ({
  initialSchoolContact,
  onSubmit,
  onDelete,
  onCancel,
  isFirst,
}) => {
  const [editMode, setEditMode] = useState<boolean>(!initialSchoolContact);
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(initialSchoolContact);
  }, [form, initialSchoolContact]);

  const onSubmitHandler = () => {
    onSubmit(form.getFieldsValue());
    setEditMode(false);
  };

  const onCancelHandler = () => {
    form.setFieldsValue(initialSchoolContact)
    if (initialSchoolContact) {
      setEditMode(false);
    } else if (onCancel !== undefined) {
      onCancel();
    }
  };

  return (
    <Form
      form={form}
      name="school-contact"
    >
      {!isFirst && <br />}
      <FormPiece>
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: 'Required' }]}
        >
          <Input placeholder="First Name*" disabled={!editMode} />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: 'Required' }]}
        >
          <Input placeholder="Last Name*" disabled={!editMode} />
        </Form.Item>
        <Form.Item
          name="address"
          rules={[{ required: true, message: 'Required' }]}
        >
          <Input placeholder="Address*" disabled={!editMode} />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[{ required: true, message: 'Required' }]}
        >
          <Input placeholder="Phone Number*" disabled={!editMode} />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Must be a valid email',
              pattern: RegExp('^\\S+@\\S+\\.\\S{2,}$'),
            },
          ]}
        >
          <Input placeholder="Email*" disabled={!editMode} />
        </Form.Item>
        <Form.Item
          name="type"
          rules={[{ required: true, message: 'Required' }]}
        >
          <Select disabled={!editMode} placeholder="Role*">
            {Object.entries(ContactType).map(([key, value]) => {
              return (
                <Select.Option key={key} value={key}>
                  {value}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        {editMode ? (
          <Row>
            <Button type="default" onClick={onCancelHandler}>
              Cancel
            </Button>
            <Button type="primary" onClick={onSubmitHandler}>
              Submit
            </Button>
          </Row>
        ) : (
          <Row>
            <Button type="default" onClick={onDelete}>
              Delete
            </Button>
            <Button type="primary" onClick={() => setEditMode(true)}>
              Edit
            </Button>
          </Row>
        )}
      </FormPiece>
    </Form>
  );
};

export default SchoolContact;

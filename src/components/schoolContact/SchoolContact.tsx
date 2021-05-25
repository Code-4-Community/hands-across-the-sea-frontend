import {
  ContactType,
  SchoolContactRequest,
  SchoolContactResponse,
} from '../../containers/schoolContact/ducks/types';
import React, { useState } from 'react';
import { Button, Form, Input, Row, Select } from 'antd';
import FormPiece from '../form-style/FormPiece';

interface SchoolContactProps {
  initialSchoolContact?: SchoolContactResponse;
  suggestedContactType?: ContactType;
  onSubmit: (c: SchoolContactRequest) => void;
  onDelete?: () => void;
  onCancel?: () => void;
}

const SchoolContact: React.FC<SchoolContactProps> = ({
  initialSchoolContact,
  onSubmit,
  onDelete,
  onCancel,
}) => {
  const [editMode, setEditMode] = useState<boolean>(!initialSchoolContact);

  const onSubmitHandler = (c: SchoolContactRequest) => {
    onSubmit(c);
    setEditMode(false);
  };

  const onCancelHandler = () => {
    if (initialSchoolContact) {
      setEditMode(false);
    } else if (onCancel !== undefined) {
      onCancel();
    }
  };

  return (
    <Form
      initialValues={initialSchoolContact}
      name="school-contact"
      onFinish={onSubmitHandler}
    >
      <FormPiece>
        <Form.Item name="firstName">
          <Input placeholder="First Name" disabled={!editMode} />
        </Form.Item>
        <Form.Item name="lastName">
          <Input placeholder="Last Name" disabled={!editMode} />
        </Form.Item>
        <Form.Item name="address">
          <Input placeholder="Address" disabled={!editMode} />
        </Form.Item>
        <Form.Item name="phone">
          <Input placeholder="Phone Number" disabled={!editMode} />
        </Form.Item>
        <Form.Item name="email">
          <Input placeholder="Email" disabled={!editMode} />
        </Form.Item>
        <Form.Item name="type">
          <Select disabled={!editMode}>
            {Object.values(ContactType).map((contactType) => {
              return (
                <Select.Option key={contactType} value={contactType}>
                  {contactType}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      </FormPiece>
      {editMode ? (
        <Row>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="default" onClick={onCancelHandler}>
            Cancel
          </Button>
        </Row>
      ) : (
        <Row>
          <Button onClick={onDelete}>Delete</Button>
          <Button onClick={() => setEditMode(true)}>Edit</Button>
        </Row>
      )}
    </Form>
  );
};

export default SchoolContact;

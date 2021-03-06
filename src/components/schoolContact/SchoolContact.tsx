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
      {!isFirst && <br />}
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
            <Button type="primary" htmlType="submit">
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

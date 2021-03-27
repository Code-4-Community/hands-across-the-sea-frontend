import {
  ContactType,
  SchoolContactRequest,
  SchoolContactResponse,
} from '../../containers/schoolContact/ducks/types';
import React, { useState } from 'react';
import { Button, Col, Dropdown, Form, Input, Row, Select } from 'antd';

interface SchoolContactProps {
  defaultSchoolContact?: SchoolContactResponse;
  suggestedContactType?: ContactType;
  onSubmit: (c: SchoolContactRequest) => void;
  onDelete?: () => void;
  onCancel?: () => void;
}

const SchoolContact: React.FC<SchoolContactProps> = ({
  defaultSchoolContact,
  suggestedContactType,
  onSubmit,
  onDelete,
  onCancel,
}) => {
  const initialSchoolContactState =
    defaultSchoolContact ||
    ({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phone: '',
      type: suggestedContactType,
    } as SchoolContactRequest);
  const [schoolContact, setSchoolContact] = useState(initialSchoolContactState);
  const [editMode, setEditMode] = useState(!defaultSchoolContact);

  const onSubmitHandler = (c: SchoolContactRequest) => {
    onSubmit(c);
    setEditMode(false);
  };

  const onCancelHandler = () => {
    if (defaultSchoolContact) {
      setEditMode(false);
    } else if (onCancel) {
      onCancel();
    }
  };

  if (editMode) {
    return (
      <EditContact
        initialSchoolContact={schoolContact}
        onSubmit={onSubmitHandler}
        onCancel={onCancelHandler}
      />
    );
  } else {
    return (
      <div>
        <Row gutter={[24, 0]}>
          <Col flex={12}>{schoolContact.firstName}</Col>
          <Col flex={12}>{schoolContact.lastName}</Col>
        </Row>
        <Row gutter={[24, 0]}>
          <Col flex={12}>{schoolContact.phone}</Col>
          <Col flex={12}>{schoolContact.email}</Col>
        </Row>
        {schoolContact.type}
        <Button onClick={() => setEditMode(true)}>Edit</Button>
        <Button onClick={onDelete}>Delete</Button>
      </div>
    );
  }
};

interface EditContactProps {
  initialSchoolContact: SchoolContactRequest;
  onSubmit: (c: SchoolContactRequest) => void;
  onCancel: () => void;
}
const EditContact: React.FC<EditContactProps> = ({
  initialSchoolContact,
  onSubmit,
  onCancel,
}) => {
  return (
    <Form
      initialValues={initialSchoolContact}
      name="school-contact"
      onFinish={onSubmit}
    >
      <Row gutter={[24, 0]}>
        <Col flex={12}>
          <Form.Item name="firstName">
            <Input placeholder="First Name" />
          </Form.Item>
        </Col>
        <Col flex={12}>
          <Form.Item name="lastName">
            <Input placeholder="Last Name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[24, 0]}>
        <Col flex={12}>
          <Form.Item name="phone">
            <Input placeholder="Phone Number" />
          </Form.Item>
        </Col>
        <Col flex={12}>
          <Form.Item name="email">
            <Input placeholder="Email" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="type">
        <Select>
          {Object.values(ContactType).map((contactType) => {
            return (
              <Select.Option key={contactType} value={contactType}>
                {contactType}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button type="default" onClick={onCancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SchoolContact;

import React, { useEffect, useState } from 'react';
import {
  createSchoolContact,
  deleteSchoolContact,
  loadSchoolContacts,
  updateSchoolContact,
} from './ducks/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { C4CState } from '../../store';
import {
  ContactType,
  SchoolContactRequest,
  SchoolContactResponse,
  SchoolContactsReducerState,
} from './ducks/types';
import SchoolContact from '../../components/schoolContact/SchoolContact';
import { Button, Col, Form, Input, Row } from 'antd';
import { AsyncRequestKinds } from '../../utils/asyncRequest';
import FormContainer from '../../components/form-style/FormContainer';
import { useHistory } from 'react-router-dom';

const SchoolContacts: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const schoolId = 1; // Will eventually fetch from store
  const schoolContacts: SchoolContactsReducerState['schoolContacts'] = useSelector(
    (state: C4CState) => state.schoolContactsState.schoolContacts,
  );
  const [showAddContact, setShowAddContact] = useState<boolean>(false);

  useEffect(() => {
    dispatch(loadSchoolContacts(schoolId));
  }, [schoolId]);

  const deleteContact = (contactId: number) => {
    dispatch(deleteSchoolContact(schoolId, contactId));
  };

  const renderExistingSchoolContact = (
    contact: SchoolContactResponse,
  ): JSX.Element => {
    const submitCallback = (c: SchoolContactRequest): void => {
      dispatch(updateSchoolContact(schoolId, contact.id, c));
    };
    return (
      <SchoolContact
        initialSchoolContact={contact}
        onSubmit={submitCallback}
        onDelete={() => deleteContact(contact.id)}
        key={contact.id}
      />
    );
  };

  const renderAddSchoolContact = (): JSX.Element => {
    const submitCallback = (c: SchoolContactRequest): void => {
      dispatch(createSchoolContact(schoolId, c));
      setShowAddContact(false);
    };
    return (
      <SchoolContact
        onSubmit={submitCallback}
        suggestedContactType={ContactType.PRINCIPAL}
        onCancel={() => setShowAddContact(false)}
      />
    );
  };

  switch (schoolContacts.kind) {
    case AsyncRequestKinds.NotStarted:
    case AsyncRequestKinds.Loading:
      return <p>Loading school contacts...</p>;
    case AsyncRequestKinds.Failed:
      return <p>Failed to load contacts</p>;
    case AsyncRequestKinds.Completed:
      return (
        <FormContainer title="School Contacts">
          <Row gutter={[0, 24]}>
            <Col flex={24}>
              {schoolContacts.result.map(renderExistingSchoolContact)}
              {!showAddContact && (
                <Button onClick={() => setShowAddContact(true)}>
                  Add Contact
                </Button>
              )}
              {showAddContact && renderAddSchoolContact()}
            </Col>
          </Row>
          <Button onClick={() => history.push('/library-info')}>Next</Button>
        </FormContainer>
      );
  }
};

export default SchoolContacts;

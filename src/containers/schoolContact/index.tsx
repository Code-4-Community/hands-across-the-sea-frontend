import React, { useEffect, useState } from 'react';
import {
  createSchoolContact,
  deleteSchoolContact,
  loadSchoolContacts,
  updateSchoolContact,
} from './ducks/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { getSchoolContacts } from './ducks/selectors';
import { C4CState } from '../../store';
import {
  ContactType,
  SchoolContactRequest,
  SchoolContactResponse,
} from './ducks/types';
import SchoolContact from '../../components/schoolContact/SchoolContact';
import { Button } from 'antd';

const SchoolContactContainer = () => {
  const dispatch = useDispatch();
  const schoolId = 1; // Will eventually fetch from store
  const schoolContacts = useSelector((state: C4CState) =>
    getSchoolContacts(state.schoolContactsState, schoolId),
  );
  const [showAddContact, setShowAddContact] = useState(false);

  useEffect(() => {
    dispatch(loadSchoolContacts(schoolId));
  }, [schoolId]);

  const deleteContact = (contactId: number) => {
    dispatch(deleteSchoolContact(schoolId, contactId));
  };

  const renderExistingSchoolContact = (contact: SchoolContactResponse) => {
    const submitCallback = (c: SchoolContactRequest) => {
      dispatch(updateSchoolContact(schoolId, contact.id, c));
    };
    return (
      <SchoolContact
        defaultSchoolContact={contact}
        onSubmit={submitCallback}
        onDelete={() => deleteContact(contact.id)}
        key={contact.id}
      />
    );
  };

  const renderAddSchoolContact = () => {
    const submitCallback = (c: SchoolContactRequest) => {
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

  return (
    <div>
      {schoolContacts.map(renderExistingSchoolContact)}
      {!showAddContact && (
        <Button onClick={() => setShowAddContact(true)}>Add Contact</Button>
      )}
      {showAddContact && renderAddSchoolContact()}
    </div>
  );
};

export default SchoolContact;

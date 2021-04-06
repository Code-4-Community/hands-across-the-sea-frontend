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
import { Button } from 'antd';
import { AsyncRequestKinds } from '../../utils/asyncRequest';

const SchoolContacts: React.FC = () => {
  const dispatch = useDispatch();
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
        defaultSchoolContact={contact}
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
        <div>
          {schoolContacts.result.map(renderExistingSchoolContact)}
          {!showAddContact && (
            <Button onClick={() => setShowAddContact(true)}>Add Contact</Button>
          )}
          {showAddContact && renderAddSchoolContact()}
        </div>
      );
  }
};

export default SchoolContacts;

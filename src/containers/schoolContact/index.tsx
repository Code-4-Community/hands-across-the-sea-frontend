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
import { Col, Row } from 'antd';
import { AsyncRequestKinds } from '../../utils/asyncRequest';
import FormContainer from '../../components/form-style/FormContainer';
import { useHistory } from 'react-router-dom';
import { SelectSchoolReducerState } from '../selectSchool/ducks/types';
import FormButtons from '../../components/form-style/FormButtons';

const SchoolContacts: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const schoolId: SelectSchoolReducerState['selectedSchoolId'] = useSelector(
    (state: C4CState) => state.selectSchoolState.selectedSchoolId,
  );
  const schoolContacts: SchoolContactsReducerState['schoolContacts'] = useSelector(
    (state: C4CState) => state.schoolContactsState.schoolContacts,
  );
  const [showAddContact, setShowAddContact] = useState<boolean>(false);

  useEffect(() => {
    if (schoolId) {
      dispatch(loadSchoolContacts(schoolId));
    }
  }, [schoolId, dispatch]);

  const deleteContact = (contactId: number) => {
    if (schoolId) {
      dispatch(deleteSchoolContact(schoolId, contactId));
    }
  };

  const renderExistingSchoolContact = (
    contact: SchoolContactResponse,
    isFirst?: boolean,
  ): JSX.Element => {
    const submitCallback = (c: SchoolContactRequest): void => {
      if (schoolId) {
        dispatch(updateSchoolContact(schoolId, contact.id, c));
      }
    };
    return (
      <SchoolContact
        initialSchoolContact={contact}
        onSubmit={submitCallback}
        onDelete={() => deleteContact(contact.id)}
        key={contact.id}
        isFirst={isFirst}
      />
    );
  };

  const renderAddSchoolContact = (): JSX.Element => {
    const submitCallback = (c: SchoolContactRequest): void => {
      if (schoolId) {
        dispatch(createSchoolContact(schoolId, c));
        setShowAddContact(false);
      }
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
        <>
          <FormContainer title="School Contacts">
            <Row gutter={[0, 24]}>
              <Col flex={24}>
                {Array.from(schoolContacts.result).map((c, index) => {
                  return renderExistingSchoolContact(c, index === 0);
                })}
              </Col>
            </Row>
            {showAddContact && renderAddSchoolContact()}
          </FormContainer>
          <FormButtons>
            <FormButtons.Button
              text="Back"
              type="secondary"
              onClick={() => history.push('/school-info')}
            />
            {!showAddContact && (
              <FormButtons.Button
                text="Add Another Contact"
                type="secondary"
                onClick={() => setShowAddContact(true)}
              />
            )}
            <FormButtons.Button
              text="Next"
              type="primary"
              onClick={() => history.push('/library-info')}
            />
          </FormButtons>
        </>
      );
  }
};

export default SchoolContacts;

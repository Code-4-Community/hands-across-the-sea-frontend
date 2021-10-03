import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import protectedApiClient from '../../api/protectedApiClient';
import { Routes } from '../../App';
import FormButtons from '../../components/form-style/FormButtons';
import FormContainer from '../../components/form-style/FormContainer';
import SchoolContact from '../../components/schoolContact/SchoolContact';
import { C4CState } from '../../store';
import { SelectSchoolReducerState } from '../selectSchool/ducks/types';
import {
  ContactType,
  SchoolContactRequest,
  SchoolContactResponse,
} from './types';

const SchoolContacts: React.FC = () => {
  const history = useHistory();
  const schoolId: SelectSchoolReducerState['selectedSchoolId'] = useSelector(
    (state: C4CState) => state.selectSchoolState.selectedSchoolId,
  );
  const [showAddContact, setShowAddContact] = useState<boolean>(false);

  const { isLoading, error, data } = useQuery(
    ['schoolContacts', schoolId],
    () => protectedApiClient.getSchoolContacts(schoolId as number),
    {
      enabled: schoolId !== undefined,
    },
  );

  if (schoolId === undefined) {
    history.replace(Routes.HOME);
    return <></>;
  }

  const deleteContact = async (contactId: number) => {
    await protectedApiClient.deleteSchoolContact(schoolId, contactId);
  };

  const renderExistingSchoolContact = (
    contact: SchoolContactResponse,
    isFirst?: boolean,
  ): JSX.Element => {
    const submitCallback = async (c: SchoolContactRequest): Promise<void> => {
      await protectedApiClient.updateSchoolContact(schoolId, contact.id, c);
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
    const submitCallback = async (c: SchoolContactRequest): Promise<void> => {
      await protectedApiClient.createSchoolContact(schoolId, c);
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
    <>
      {isLoading && <p>Loading school contacts...</p>}
      {error && <p>Failed to load contacts</p>}
      {data && (
        <>
          <FormContainer title="School Contacts">
            <Row gutter={[0, 24]}>
              <Col flex={24}>
                {data.map((c, index) => {
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
      )}
    </>
  );
};

export default SchoolContacts;

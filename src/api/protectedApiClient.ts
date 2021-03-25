import AppAxiosInstance from '../auth/axios';
import {
  SchoolContactRequest,
  SchoolContactResponse,
} from '../containers/schoolContact/ducks/types';

export interface ApiExtraArgs {
  readonly protectedApiClient: ProtectedApiClient;
}

export interface ProtectedApiClient {
  readonly changePassword: (request: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;

  readonly getSchoolContacts: (
    schoolId: number,
  ) => Promise<SchoolContactResponse[]>;

  readonly updateSchoolContact: (
    schoolId: number,
    contactId: number,
    updatedSchoolContact: SchoolContactRequest,
  ) => Promise<void>;
}

enum ProtectedApiClientRoutes {
  CHANGE_PASSWORD = '/api/v1/protected/user/change_password',
  SCHOOL_CONTACTS = '/api/v1/protected/schools/:school_id/contacts',
}

const changePassword = (request: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.CHANGE_PASSWORD,
    request,
  )
    .then((res) => res)
    .catch((err) => err);
};

const getSchoolContacts = (
  schoolId: number,
): Promise<SchoolContactResponse[]> => {
  return AppAxiosInstance.get(
    ProtectedApiClientRoutes.SCHOOL_CONTACTS.replace(
      ':school_id',
      schoolId.toString(),
    ),
  )
    .then((res) => res.data.schoolContacts)
    .catch((err) => err);
};

const updateSchoolContact = (
  schoolId: number,
  contactId: number,
  updatedSchoolContact: SchoolContactRequest,
): Promise<void> => {
  return AppAxiosInstance.put(
    `${ProtectedApiClientRoutes.SCHOOL_CONTACTS.replace(
      ':school_id',
      schoolId.toString(),
    )}/${contactId}`,
    updatedSchoolContact,
  )
    .then((res) => res)
    .catch((err) => err);
};

const Client: ProtectedApiClient = Object.freeze({
  changePassword,
  getSchoolContacts,
  updateSchoolContact,
});

export default Client;

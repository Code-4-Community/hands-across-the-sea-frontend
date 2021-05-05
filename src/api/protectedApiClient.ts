import AppAxiosInstance from '../auth/axios';
import {
  SchoolContactRequest,
  SchoolContactResponse,
} from '../containers/schoolContact/ducks/types';
import {
  BookLogRequest,
  BookLogResponse,
} from '../containers/bookLogs/ducks/types';
import { SchoolEntry } from '../containers/selectSchool/ducks/types';

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

  readonly createSchoolContact: (
    schoolId: number,
    schoolContact: SchoolContactRequest,
  ) => Promise<void>;

  readonly deleteSchoolContact: (
    schoolId: number,
    contactId: number,
  ) => Promise<void>;

  readonly createBookLog: (
    schoolId: number,
    report: BookLogRequest,
  ) => Promise<BookLogRequest>;

  readonly updateBookLog: (
    schoolId: number,
    bookLogId: number,
    report: BookLogRequest,
  ) => Promise<BookLogRequest>;

  readonly getBookLogs: (schoolId: number) => Promise<BookLogResponse[]>;

  readonly deleteBookLog: (
    schoolId: number,
    bookLogId: number,
  ) => Promise<void>;

  readonly getAllSchools: () => Promise<SchoolEntry[]>;
}

enum ProtectedApiClientRoutes {
  CHANGE_PASSWORD = '/api/v1/protected/user/change_password',
  SCHOOL_CONTACTS = '/api/v1/protected/schools/:school_id/contacts',
  SCHOOLS = '/api/v1/protected/schools',
  BOOK_REPORTS = '/api/v1/protected/schools/:school_id/books',
}

export type WithCount<T> = T & {
  count: number;
};

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

const createSchoolContact = (
  schoolId: number,
  updatedSchoolContact: SchoolContactRequest,
): Promise<void> => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.SCHOOL_CONTACTS.replace(
      ':school_id',
      schoolId.toString(),
    ),
    updatedSchoolContact,
  )
    .then((res) => res)
    .catch((err) => err);
};

const deleteSchoolContact = (
  schoolId: number,
  contactId: number,
): Promise<void> => {
  return AppAxiosInstance.delete(
    `${ProtectedApiClientRoutes.SCHOOL_CONTACTS.replace(
      ':school_id',
      schoolId.toString(),
    )}/${contactId.toString()}`,
  )
    .then((res) => res)
    .catch((err) => err);
};

const createBookLog = (
  schoolId: number,
  report: BookLogRequest,
): Promise<BookLogResponse> => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.BOOK_REPORTS.replace(
      ':school_id',
      schoolId.toString(),
    ),
    report,
  )
    .then((res) => res.data)
    .catch((err) => err);
};

const updateBookLog = (
  schoolId: number,
  bookLogId: number,
  report: BookLogRequest,
): Promise<BookLogResponse> => {
  return AppAxiosInstance.put(
    ProtectedApiClientRoutes.BOOK_REPORTS.replace(
      ':school_id',
      schoolId.toString(),
    ) + `/${bookLogId}`,
    report,
  )
    .then((res) => res.data)
    .catch((err) => err);
};

const getBookLogs = (schoolId: number): Promise<BookLogResponse[]> => {
  return AppAxiosInstance.get(
    ProtectedApiClientRoutes.BOOK_REPORTS.replace(
      ':school_id',
      schoolId.toString(),
    ),
  )
    .then((res) => res.data.bookLogs)
    .catch((err) => err);
};

const deleteBookLog = (schoolId: number, bookLogId: number): Promise<void> => {
  return AppAxiosInstance.delete(
    ProtectedApiClientRoutes.BOOK_REPORTS.replace(
      ':school_id',
      schoolId.toString(),
    ) + `/${bookLogId}`,
  )
    .then((res) => res)
    .catch((err) => err);
};

const getAllSchools = (): Promise<SchoolEntry[]> => {
  return AppAxiosInstance.get(ProtectedApiClientRoutes.SCHOOLS)
    .then((res) => res.data.schools)
    .catch((err) => err);
};

const Client: ProtectedApiClient = Object.freeze({
  changePassword,
  getSchoolContacts,
  updateSchoolContact,
  createSchoolContact,
  deleteSchoolContact,
  createBookLog,
  updateBookLog,
  getBookLogs,
  deleteBookLog,
  getAllSchools,
});

export default Client;

import AppAxiosInstance from '../auth/axios';
import { SchoolRequest, SchoolResponse } from '../containers/schoolInfo/ducks/types';
import {
  SchoolContactRequest,
  SchoolContactResponse,
} from '../containers/schoolContact/ducks/types';
import {
  ReportWithLibraryRequest,
  ReportWithLibraryResponse,
} from '../containers/reportWithLibrary/ducks/types';
import { BookLogRequest, BookLogResponse } from '../containers/bookLogs/ducks/types';
import { SchoolEntry } from '../containers/selectSchool/ducks/types';

export interface ApiExtraArgs {
  readonly protectedApiClient: ProtectedApiClient;
}

export interface ProtectedApiClient {
  readonly changePassword: (request: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;

  readonly createSchool: (request: SchoolRequest) => Promise<SchoolResponse>;
  readonly getSchool: (schoolId: number) => Promise<SchoolResponse>;
  readonly deleteSchool: (schoolId: number) => Promise<void>;

  readonly updateSchool: (
    schoolId: number,
    updatedSchool: SchoolRequest,
  ) => Promise<void>;

  readonly deleteUser: (request: { password: string }) => Promise<void>;

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

  readonly getReportWithLibrary: (
    reportId: number,
  ) => Promise<ReportWithLibraryResponse>;

  readonly createReportWithLibrary: (
    schoolId: number,
    report: ReportWithLibraryRequest,
  ) => Promise<ReportWithLibraryResponse>;

  readonly getAllSchools: () => Promise<SchoolEntry[]>;
}

export enum ProtectedApiClientRoutes {
  CHANGE_PASSWORD = '/api/v1/protected/user/change_password',
  DELETE_USER = '/api/v1/protected/user/',
  SCHOOLS = '/api/v1/protected/schools',
  SCHOOL_CONTACTS = '/api/v1/protected/schools/:school_id/contacts',
  REPORT_WITH_LIBRARY = '/api/v1/protected/schools/:school_id/reports',
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
    .then((res) => res.data)
    .catch((err) => err);
};

const deleteUser = (request: { password: string }): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.DELETE_USER, request)
    .then((r) => r.data)
    .catch((e) => e);
};

const createSchool = (request: SchoolRequest): Promise<SchoolResponse> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.SCHOOLS, request)
    .then((r) => r.data)
    .catch((e) => e);
};

const deleteSchool = (schoolId: number): Promise<void> => {
  return AppAxiosInstance.delete(
    `${ProtectedApiClientRoutes.SCHOOLS}/${schoolId.toString()}`,
  )
    .then((res) => res)
    .catch((err) => err);
};

const getSchool = (schoolId: number): Promise<SchoolResponse> => {
  return AppAxiosInstance.get(
    `${ProtectedApiClientRoutes.SCHOOLS}/${schoolId.toString()}`,
  )
    .then((r) => r.data)
    .catch((e) => e);
};

const updateSchool = (
  schoolId: number,
  updatedSchool: SchoolRequest,
): Promise<void> => {
  return AppAxiosInstance.put(
    `${ProtectedApiClientRoutes.SCHOOLS}/${schoolId.toString()}`,
    updatedSchool,
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

const getReportWithLibrary = (
  reportId: number,
): Promise<ReportWithLibraryResponse> => {
  return AppAxiosInstance.get(
    `${ProtectedApiClientRoutes.REPORT_WITH_LIBRARY}/${reportId.toString()}`,
  )
    .then((res) => res.data) // TODO
    .catch((err) => err);
};

const createReportWithLibrary = (
  schoolId: number,
  report: ReportWithLibraryRequest,
): Promise<ReportWithLibraryResponse> => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.REPORT_WITH_LIBRARY.replace(
      ':school_id',
      schoolId.toString(),
    ),
    report,
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
  createSchool,
  deleteSchool,
  getSchool,
  updateSchool,
  deleteUser,
  getSchoolContacts,
  updateSchoolContact,
  createSchoolContact,
  deleteSchoolContact,
  getReportWithLibrary,
  createBookLog,
  updateBookLog,
  getBookLogs,
  deleteBookLog,
  getAllSchools,
  createReportWithLibrary,
});

export default Client;

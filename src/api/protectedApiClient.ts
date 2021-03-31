import AppAxiosInstance from '../auth/axios';
import {
  SchoolContactRequest,
  SchoolContactResponse,
} from '../containers/schoolContact/ducks/types';
import {
  ReportWithLibraryRequest,
  ReportWithLibraryResponse,
} from '../containers/reportWithLibrary/ducks/types';

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

  readonly getReportWithLibrary: (
    reportId: number,
  ) => Promise<ReportWithLibraryResponse>;

  readonly createReportWithLibrary: (
    schoolId: number,
    report: ReportWithLibraryRequest,
  ) => Promise<ReportWithLibraryResponse>;
}

enum ProtectedApiClientRoutes {
  CHANGE_PASSWORD = '/api/v1/protected/user/change_password',
  SCHOOL_CONTACTS = '/api/v1/protected/schools/:school_id/contacts',
  REPORT_WITH_LIBRARY = '/api/v1/protected/schools/:school_id/reports',
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
    ProtectedApiClientRoutes.REPORT_WITH_LIBRARY.replace(
      ':report_id',
      reportId.toString(),
    ),
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

const Client: ProtectedApiClient = Object.freeze({
  changePassword,
  getSchoolContacts,
  updateSchoolContact,
  createSchoolContact,
  deleteSchoolContact,
  getReportWithLibrary,
  createReportWithLibrary,
});

export default Client;

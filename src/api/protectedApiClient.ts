import AppAxiosInstance from '../auth/axios';
import {
  SchoolRequest,
  SchoolResponse,
} from '../containers/schoolInfo/ducks/types';
import {
  SchoolContactRequest,
  SchoolContactResponse,
} from '../containers/schoolContact/ducks/types';
import {
  BookLogRequest,
  BookLogResponse,
  BookLogPostRequest,
} from '../containers/bookLogs/ducks/types';
import { SchoolEntry } from '../containers/selectSchool/ducks/types';
import {
  LibraryReportResponse,
  ReportWithLibraryRequest,
  ReportWithoutLibraryRequest,
} from '../containers/library-report/ducks/types';
import { GetUserResponse } from '../containers/settings/ducks/types';
import {
  GetAllUsersResponse,
  UpdateUserRequest,
} from '../containers/userDirectory/ducks/types';
import { PastSubmissionsSchoolsResponse } from '../containers/pastSubmissionsSchools/ducks/types';
import { ReportGenericListResponse } from '../containers/pastSubmissionsReports/ducks/types';

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
  readonly updateUser: (
    request: UpdateUserRequest,
    userId: number,
  ) => Promise<void>;
  readonly getUser: () => Promise<GetUserResponse>;
  readonly disableUser: (userId: number) => Promise<void>;
  readonly enableUser: (userId: number) => Promise<void>;
  readonly getAllUsers: () => Promise<GetAllUsersResponse>;

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

  readonly getLatestReport: (
    schoolId: number,
  ) => Promise<LibraryReportResponse>;

  readonly getLatestReportWithLibrary: (
    schoolId: number,
  ) => Promise<LibraryReportResponse>;

  readonly createBookLog: (
    schoolId: number,
    report: BookLogPostRequest,
  ) => Promise<BookLogPostRequest>;

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

  readonly createReportWithLibrary: (
    schoolId: number,
    report: ReportWithLibraryRequest,
  ) => Promise<LibraryReportResponse>;

  readonly createReportWithoutLibrary: (
    schoolId: number,
    report: ReportWithoutLibraryRequest,
  ) => Promise<LibraryReportResponse>;

  readonly editReportWithLibrary: (
    schoolId: number,
    reportId: number,
    report: ReportWithLibraryRequest,
  ) => Promise<void>;

  readonly editReportWithoutLibrary: (
    schoolId: number,
    reportId: number,
    report: ReportWithoutLibraryRequest,
  ) => Promise<void>;

  readonly getAllSchools: () => Promise<SchoolEntry[]>;

  readonly getPastSubmissionSchools: () => Promise<PastSubmissionsSchoolsResponse>;

  readonly getPastSubmissionReports: (
    schoolId: number,
    page: number,
  ) => Promise<ReportGenericListResponse>;
}

export enum ProtectedApiClientRoutes {
  CHANGE_PASSWORD = '/api/v1/protected/user/change_password',
  USER = '/api/v1/protected/user',
  SCHOOLS = '/api/v1/protected/schools',
  SCHOOL_CONTACTS = '/api/v1/protected/schools/:school_id/contacts',
  REPORT_WITHOUT_LIBRARY = '/api/v1/protected/schools/:school_id/reports/without-library',
  REPORT_WITH_LIBRARY = '/api/v1/protected/schools/:school_id/reports/with-library',
  LIBRARY_REPORTS = '/api/v1/protected/schools/:school_id/reports',
  SINGLE_LIBRARY_REPORT = '/api/v1/protected/schools/:school_id/report',
  BOOK_REPORTS = '/api/v1/protected/schools/:school_id/books',
  PAST_SUBMISSIONS_SCHOOLS = '/api/v1/protected/schools/reports/users',
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
  ).then((res) => res.data);
};

const deleteUser = (request: { password: string }): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.USER, request).then(
    (res) => res.data,
  );
};

const updateUser = (
  request: UpdateUserRequest,
  userId: number,
): Promise<void> => {
  return AppAxiosInstance.put(
    `${ProtectedApiClientRoutes.USER}/${userId}`,
    request,
  ).then((res) => res.data);
};

const getUser = (): Promise<GetUserResponse> => {
  return AppAxiosInstance.get(`${ProtectedApiClientRoutes.USER}/data`).then(
    (res) => res.data,
  );
};

const disableUser = (userId: number): Promise<void> => {
  return AppAxiosInstance.post(
    `${ProtectedApiClientRoutes.USER}/disable/${userId}`,
  ).then((res) => res.data);
};

const enableUser = (userId: number): Promise<void> => {
  return AppAxiosInstance.post(
    `${ProtectedApiClientRoutes.USER}/enable/${userId}`,
  ).then((res) => res.data);
};

const getAllUsers = (): Promise<GetAllUsersResponse> => {
  return AppAxiosInstance.get(`${ProtectedApiClientRoutes.USER}/`).then(
    (res) => res.data,
  );
};

const createSchool = (request: SchoolRequest): Promise<SchoolResponse> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.SCHOOLS, request).then(
    (res) => res.data,
  );
};

const deleteSchool = (schoolId: number): Promise<void> => {
  return AppAxiosInstance.delete(
    `${ProtectedApiClientRoutes.SCHOOLS}/${schoolId.toString()}`,
  ).then((res) => res.data);
};

const getSchool = (schoolId: number): Promise<SchoolResponse> => {
  return AppAxiosInstance.get(
    `${ProtectedApiClientRoutes.SCHOOLS}/${schoolId.toString()}`,
  ).then((res) => res.data);
};

const updateSchool = (
  schoolId: number,
  updatedSchool: SchoolRequest,
): Promise<void> => {
  return AppAxiosInstance.put(
    `${ProtectedApiClientRoutes.SCHOOLS}/${schoolId.toString()}`,
    updatedSchool,
  ).then((res) => res.data);
};

const getSchoolContacts = (
  schoolId: number,
): Promise<SchoolContactResponse[]> => {
  return AppAxiosInstance.get(
    ProtectedApiClientRoutes.SCHOOL_CONTACTS.replace(
      ':school_id',
      schoolId.toString(),
    ),
  ).then((res) => res.data.schoolContacts);
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
  ).then((res) => res.data);
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
  ).then((res) => res.data);
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
  ).then((res) => res.data);
};

const getLatestReportWithLibrary = (schoolId: number): Promise<LibraryReportResponse> => {
  return AppAxiosInstance.get(
    `${ProtectedApiClientRoutes.SINGLE_LIBRARY_REPORT.replace(
      ':school_id',
      schoolId.toString(),
    )}`
  ).then((res) => res.data)
}

const getLatestReport = (schoolId: number): Promise<LibraryReportResponse> => {
  return AppAxiosInstance.get(
    `${ProtectedApiClientRoutes.REPORT_WITHOUT_LIBRARY}/${schoolId.toString()}`,
  ).then((res) => res.data); // TODO
};

const createReportWithLibrary = (
  schoolId: number,
  report: ReportWithLibraryRequest,
): Promise<LibraryReportResponse> => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.REPORT_WITH_LIBRARY.replace(
      ':school_id',
      schoolId.toString(),
    ),
    report,
  ).then((res) => res.data);
};

const createReportWithoutLibrary = (
  schoolId: number,
  report: ReportWithoutLibraryRequest,
): Promise<LibraryReportResponse> => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.REPORT_WITHOUT_LIBRARY.replace(
      ':school_id',
      schoolId.toString(),
    ),
    report,
  ).then((res) => res.data);
};

const createBookLog = (
  schoolId: number,
  report: BookLogPostRequest,
): Promise<BookLogPostRequest> => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.BOOK_REPORTS.replace(
      ':school_id',
      schoolId.toString(),
    ),
    report,
  ).then((res) => res.data);
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
  ).then((res) => res.data);
};

const getBookLogs = (schoolId: number): Promise<BookLogResponse[]> => {
  return AppAxiosInstance.get(
    ProtectedApiClientRoutes.BOOK_REPORTS.replace(
      ':school_id',
      schoolId.toString(),
    ),
  ).then((res) => res.data.bookLogs);
};

const deleteBookLog = (schoolId: number, bookLogId: number): Promise<void> => {
  return AppAxiosInstance.delete(
    ProtectedApiClientRoutes.BOOK_REPORTS.replace(
      ':school_id',
      schoolId.toString(),
    ) + `/${bookLogId}`,
  ).then((res) => res.data);
};

const getAllSchools = (): Promise<SchoolEntry[]> => {
  return AppAxiosInstance.get(ProtectedApiClientRoutes.SCHOOLS).then(
    (res) => res.data.schools,
  );
};

const getPastSubmissionSchools = (): Promise<PastSubmissionsSchoolsResponse> => {
  return AppAxiosInstance.get(
    ProtectedApiClientRoutes.PAST_SUBMISSIONS_SCHOOLS,
  ).then((res) => res.data);
};

const getPastSubmissionReports = (
  schoolId: number,
  page = 1,
): Promise<ReportGenericListResponse> => {
  return AppAxiosInstance.get(
    ProtectedApiClientRoutes.LIBRARY_REPORTS.replace(
      ':school_id',
      schoolId.toString(),
    ),
    {
      params: {
        p: page,
      },
    },
  ).then((res) => res.data);
};

const editReportWithLibrary = (
  schoolId: number,
  reportId: number,
  report: ReportWithLibraryRequest,
): Promise<void> => {
  return AppAxiosInstance.put(
    ProtectedApiClientRoutes.REPORT_WITH_LIBRARY.replace(
      ':school_id',
      schoolId.toString(),
    ) + `/${reportId}`,
    report,
  ).then((res) => res.data);
};

const editReportWithoutLibrary = (
  schoolId: number,
  reportId: number,
  report: ReportWithoutLibraryRequest,
): Promise<void> => {
  return AppAxiosInstance.put(
    ProtectedApiClientRoutes.REPORT_WITHOUT_LIBRARY.replace(
      ':school_id',
      schoolId.toString(),
    ) + `/${reportId}`,
    report,
  ).then((res) => res.data);
};

const Client: ProtectedApiClient = Object.freeze({
  changePassword,
  createSchool,
  deleteSchool,
  getSchool,
  updateSchool,
  deleteUser,
  updateUser,
  getUser,
  disableUser,
  enableUser,
  getAllUsers,
  getSchoolContacts,
  updateSchoolContact,
  createSchoolContact,
  deleteSchoolContact,
  createBookLog,
  updateBookLog,
  getBookLogs,
  deleteBookLog,
  getAllSchools,
  getLatestReport,
  createReportWithLibrary,
  createReportWithoutLibrary,
  editReportWithLibrary,
  editReportWithoutLibrary,
  getPastSubmissionSchools,
  getPastSubmissionReports,
  getLatestReportWithLibrary
});

export default Client;

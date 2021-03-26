import AppAxiosInstance from '../auth/axios';
import {
  SchoolRequest,
  SchoolResponse,
} from '../containers/schoolInfo/ducks/types';

export interface ApiExtraArgs {
  protectedApiClient: ProtectedApiClient;
}

export interface ProtectedApiClient {
  readonly changePassword: (request: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
  readonly createSchool: (request: SchoolRequest) => Promise<SchoolResponse>;
  readonly getSchool: (id: number) => Promise<SchoolResponse>;
  readonly deleteUser: (request: { password: string }) => Promise<void>;
}

export enum ProtectedApiClientRoutes {
  CHANGE_PASSWORD = '/api/v1/protected/user/change_password',
  CREATE_SCHOOL = '/api/v1/protected/schools',
  GET_SCHOOL = '/api/v1/protected/schools/',
  DELETE_USER = '/api/v1/protected/user/',
}

const changePassword = (request: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.CHANGE_PASSWORD,
    request,
  )
    .then((r) => r.data)
    .catch((e) => e);
};

const deleteUser = (request: { password: string }): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.DELETE_USER, request)
    .then((r) => r.data)
    .catch((e) => e);
};

const createSchool = (request: SchoolRequest): Promise<SchoolResponse> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.CREATE_SCHOOL, request)
    .then((r) => r.data)
    .catch((e) => e);
};

const getSchool = (id: number): Promise<SchoolResponse> => {
  return AppAxiosInstance.get(ProtectedApiClientRoutes.GET_SCHOOL + id)
    .then((r) => r.data)
    .catch((e) => e);
};

const Client: ProtectedApiClient = Object.freeze({
  changePassword,
  createSchool,
  getSchool,
  deleteUser,
});

export default Client;

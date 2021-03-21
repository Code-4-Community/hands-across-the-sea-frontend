import AppAxiosInstance from '../auth/axios';
import {
  SchoolRequest,
  SchoolResponse,
} from '../containers/schoolInfo/ducks/types';

export interface ProtectedApiClient {
  readonly changePassword: (request: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
  readonly createSchool: (request: SchoolRequest) => Promise<SchoolResponse>;
}

enum ProtectedApiClientRoutes {
  CHANGE_PASSWORD = '/api/v1/protected/user/change_password',
  SCHOOL_INFO = '/api/v1/protected/schools',
}

const changePassword = (request: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.CHANGE_PASSWORD,
    request,
  )
    .then((r) => r)
    .catch((e) => e);
};

const createSchool = (request: SchoolRequest): Promise<SchoolResponse> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.SCHOOL_INFO, request)
    .then((r) => r.data)
    .catch((e) => e);
};

const Client: ProtectedApiClient = Object.freeze({
  changePassword,
  createSchool,
});

export default Client;

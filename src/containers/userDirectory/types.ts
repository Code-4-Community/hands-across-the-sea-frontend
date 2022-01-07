import { PrivilegeLevel } from '../../auth/ducks/types';
import { AsyncRequest } from '../../utils/asyncRequest';
import { Countries } from '../../utils/countries';

export interface UserDirectoryReducerState {
  readonly allUsers: AsyncRequest<GetAllUsersResponse, any>;
}

export interface GetAllUsersResponse {
  readonly users: UserResponse[];
}

// for naming purposes on api typing
export type UpdateUserRequest = UserResponse;

export interface UserResponse {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly country: keyof typeof Countries;
  readonly privilegeLevel: PrivilegeLevel;
  readonly disabled: boolean;
}

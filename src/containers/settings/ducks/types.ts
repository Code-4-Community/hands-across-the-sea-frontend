import { Countries } from '../../../utils/countries';
import { PrivilegeLevel } from '../../../auth/ducks/types';

export interface GetUserResponse {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly country: keyof typeof Countries;
  readonly privilegeLevel: PrivilegeLevel;
  readonly disabled: boolean;
}

export interface ChangePasswordRequest {
  readonly currentPassword: string;
  readonly newPassword: string;
}

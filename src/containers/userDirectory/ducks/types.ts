import { Countries } from '../../../utils/countries';
import { PrivilegeLevel } from '../../../auth/ducks/types';

export interface GetAllUsersResponse {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly country: keyof typeof Countries;
  readonly privilege: PrivilegeLevel;
}

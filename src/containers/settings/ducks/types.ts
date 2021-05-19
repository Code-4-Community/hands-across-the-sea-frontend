import { Countries } from '../../../utils/countries';
import { PrivilegeLevel } from '../../../auth/ducks/types';

export interface GetUserResponse {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly country: typeof Countries;
  readonly privilegeLevel: PrivilegeLevel;
}

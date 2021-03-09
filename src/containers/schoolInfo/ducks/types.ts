import { ThunkAction } from 'redux-thunk';
import { C4CState } from '../../../store';
import { UserAuthenticationActions } from '../../../auth/ducks/actions';
import { UserAuthenticationExtraArgs } from '../../../auth/ducks/types';

export type SchoolInformationThunkAction<R> = ThunkAction<
  R,
  C4CState,
  UserAuthenticationExtraArgs,
  UserAuthenticationActions
>;

export interface SchoolResponse extends SchoolRequest {
  readonly id: number;
  readonly contacts: Contact[];
}

export interface SchoolRequest {
  readonly name: string;
  readonly address: string;
  readonly country: string;
  readonly phone: string;
  readonly email: string;
  readonly area: string;
  readonly notes: string;
  readonly hidden: boolean;
  readonly libraryStatus: string;
}

export interface Contact {
  readonly id: number;
  readonly schoolId: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly address: string;
  readonly phone: string;
  readonly type: ContactType;
}

export enum ContactType {
  PRINCIPAL = 'PRINCIPAL',
  LITERACY_COORDINATOR = 'LITERACY_COORDINATOR',
  LIBRARIAN = 'LIBRARIAN',
  OTHER = 'OTHER',
}

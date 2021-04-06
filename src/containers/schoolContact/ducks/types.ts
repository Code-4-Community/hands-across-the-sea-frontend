import { ThunkAction } from 'redux-thunk';
import { C4CState } from '../../../store';
import { ApiExtraArgs } from '../../../api/protectedApiClient';
import { SchoolContactsActions } from './actions';
import { AsyncRequest } from '../../../utils/asyncRequest';

export type SchoolContactsThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ApiExtraArgs,
  SchoolContactsActions
>;

export interface SchoolContactsReducerState {
  readonly schoolContacts: AsyncRequest<SchoolContactResponse[], any>;
}

export interface SchoolContactRequest {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly address: string;
  readonly phone: string;
  readonly type: ContactType;
}

export interface SchoolContactResponse extends SchoolContactRequest {
  readonly id: number;
  readonly schoolId: number;
}

export enum ContactType {
  PRINCIPAL = 'principal',
  LITERACY_COORDINATOR = 'literacy_coordinator',
  LIBRARIAN = 'librarian',
  OTHER = 'other',
}

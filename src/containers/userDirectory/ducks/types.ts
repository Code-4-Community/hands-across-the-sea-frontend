import { Countries } from '../../../utils/countries';
import { PrivilegeLevel } from '../../../auth/ducks/types';
import { ThunkAction } from 'redux-thunk';
import { C4CState } from '../../../store';
import { ApiExtraArgs } from '../../../api/protectedApiClient';
import { AsyncRequest } from '../../../utils/asyncRequest';
import { UserDirectoryActions } from './actions';

export type UserDirectoryThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ApiExtraArgs,
  UserDirectoryActions
>;

export interface UserDirectoryReducerState {
  readonly allUsers: AsyncRequest<GetAllUsersResponse[], any>;
}

export interface GetAllUsersResponse {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly country: keyof typeof Countries;
  readonly privilege: PrivilegeLevel;
}

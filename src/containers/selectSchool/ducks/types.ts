import { Countries } from '../../../utils/countries';
import { AsyncRequest } from '../../../utils/asyncRequest';
import { ThunkAction } from 'redux-thunk';
import { C4CState } from '../../../store';
import { ProtectedApiClient } from '../../../api/protectedApiClient';
import { SelectSchoolActions } from './actions';

export interface SchoolEntry {
  id: number;
  name: string;
  country: keyof typeof Countries;
}

export interface SelectSchoolReducerState {
  selectedSchoolId?: number;
}

export interface SelectSchoolExtraArgs {
  protectedApiClient: ProtectedApiClient;
}

export type SelectSchoolThunkAction<R> = ThunkAction<
  R,
  C4CState,
  SelectSchoolExtraArgs,
  SelectSchoolActions
>;

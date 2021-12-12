import { ProtectedApiClient } from '../../../api/protectedApiClient';
import { Countries } from '../../../utils/countries';

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

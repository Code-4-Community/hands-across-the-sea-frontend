import { Countries } from '../../../utils/countries';
import { AsyncRequest } from '../../../utils/asyncRequest';

export interface SchoolEntry {
  id: number;
  name: string;
  country: keyof typeof Countries;
}

export interface SelectSchoolReducerState {
  schools: AsyncRequest<SchoolEntry[]>;
  selectedSchoolId?: number;
}

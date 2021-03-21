import { SchoolInformationReducerState } from './types';
import { AsyncRequestNotStarted } from '../../../utils/asyncRequest';

export const initialSchoolInfoState: SchoolInformationReducerState = {
  schoolInformation: AsyncRequestNotStarted(),
};

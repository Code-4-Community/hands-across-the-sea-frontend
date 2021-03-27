import { SchoolContactsReducerState } from './types';
import { asyncRequestIsComplete } from '../../../utils/asyncRequest';

export const getSchoolContacts = (
  state: SchoolContactsReducerState,
  schoolId: number,
) => {
  if (asyncRequestIsComplete(state.schoolContacts)) {
    return state.schoolContacts.result.filter(
      (contact) => contact.schoolId === schoolId,
    );
  }
  return [];
};

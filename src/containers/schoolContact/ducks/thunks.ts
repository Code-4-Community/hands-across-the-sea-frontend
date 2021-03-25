import {
  SchoolContactRequest,
  SchoolContactResponse,
  SchoolContactsThunkAction,
} from './types';
import { schoolContacts } from './actions';
import protectedApiClient from '../../../api/protectedApiClient';

export const getSchoolContacts = (
  schoolId: number,
): SchoolContactsThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    dispatch(schoolContacts.loading());
    return protectedApiClient
      .getSchoolContacts(schoolId)
      .then((response: SchoolContactResponse[]) => {
        dispatch(schoolContacts.loaded(response));
      })
      .catch((error) => {
        dispatch(schoolContacts.failed(error.repsonse.data));
      });
  };
};

export const updateSchoolContact = (
  schoolId: number,
  contactId: number,
  updatedContact: SchoolContactRequest,
): SchoolContactsThunkAction<void> => {
  return (dispatch, getState, extraArgument) => {
    return protectedApiClient
      .updateSchoolContact(schoolId, contactId, updatedContact)
      .then(() => {
        dispatch(getSchoolContacts(schoolId));
      })
      .catch((error) => {
        dispatch(schoolContacts.failed(error.response.data));
      });
  };
};

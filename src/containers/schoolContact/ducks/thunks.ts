import {
  SchoolContactRequest,
  SchoolContactResponse,
  SchoolContactsThunkAction,
} from './types';
import { schoolContacts } from './actions';

export const loadSchoolContacts = (
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
  return (dispatch, getState, { protectedApiClient }) => {
    return protectedApiClient
      .updateSchoolContact(schoolId, contactId, updatedContact)
      .then(() => {
        dispatch(loadSchoolContacts(schoolId));
      })
      .catch((error) => {
        dispatch(schoolContacts.failed(error.response.data));
      });
  };
};

export const createSchoolContact = (
  schoolId: number,
  contact: SchoolContactRequest,
): SchoolContactsThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    return protectedApiClient
      .createSchoolContact(schoolId, contact)
      .then(() => {
        dispatch(loadSchoolContacts(schoolId));
      })
      .catch((error) => {
        dispatch(schoolContacts.failed(error.response.data));
      });
  };
};

export const deleteSchoolContact = (
  schoolId: number,
  contactId: number,
): SchoolContactsThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    return protectedApiClient
      .deleteSchoolContact(schoolId, contactId)
      .then(() => {
        dispatch(loadSchoolContacts(schoolId));
      })
      .catch((error) => {
        dispatch(schoolContacts.failed(error.response.data));
      });
  };
};

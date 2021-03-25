import { genericAsyncActions } from '../../../utils/asyncRequest';
import { SchoolContactResponse } from './types';

export const schoolContacts = genericAsyncActions<SchoolContactResponse[], any>();

export type SchoolContactsActions =
  | ReturnType<typeof schoolContacts.loading>
  | ReturnType<typeof schoolContacts.loaded>
  | ReturnType<typeof schoolContacts.failed>;

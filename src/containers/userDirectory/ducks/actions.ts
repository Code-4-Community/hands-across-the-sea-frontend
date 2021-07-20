import { genericAsyncActions } from '../../../utils/asyncRequest';
import { GetAllUsersResponse } from './types';

export const allUsers = genericAsyncActions<GetAllUsersResponse, any>();

export type UserDirectoryActions =
  | ReturnType<typeof allUsers.loading>
  | ReturnType<typeof allUsers.loaded>
  | ReturnType<typeof allUsers.failed>;

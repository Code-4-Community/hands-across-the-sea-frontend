import {
  generateExtraArgs,
  generateState,
} from '../../../auth/test/thunks.test';
import { ContactType, SchoolContactResponse } from '../ducks/types';
import protectedApiClient, {
  ApiExtraArgs,
} from '../../../api/protectedApiClient';
import {
  createSchoolContact,
  deleteSchoolContact,
  loadSchoolContacts,
  updateSchoolContact,
} from '../ducks/thunks';
import { schoolContacts } from '../ducks/actions';
import { ThunkExtraArgs } from '../../../store';

describe('School Contacts Thunks', () => {
  describe('getSchoolContacts', () => {
    it('dispatches a schoolContacts.loaded() action after api success', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockGetSchoolContacts = jest.fn();
      const mockContactsResponse: SchoolContactResponse[] = [];
      mockGetSchoolContacts.mockResolvedValue(mockContactsResponse);
      const mockExtraArgs: ApiExtraArgs = {
        protectedApiClient: {
          ...protectedApiClient,
          getSchoolContacts: mockGetSchoolContacts,
        },
      };
      await loadSchoolContacts(2)(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        schoolContacts.loaded(mockContactsResponse),
      );
      expect(mockGetSchoolContacts).toBeCalledTimes(1);
    });

    it('dispatches schoolContacts.failed() when API fails', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockGetSchoolContacts = jest.fn();
      const mockAPIError = {
        response: {
          data: 'Error fetching school contacts',
        },
      };
      mockGetSchoolContacts.mockRejectedValue(mockAPIError);
      const mockExtraArgs: ThunkExtraArgs = generateExtraArgs({
        protectedApiClient: {
          ...protectedApiClient,
          getSchoolContacts: mockGetSchoolContacts,
        },
      });

      await loadSchoolContacts(4)(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        schoolContacts.failed(mockAPIError.response.data),
      );
      expect(mockGetSchoolContacts).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateSchoolContact', () => {
    it('calls the API route and dispatches loadSchoolContacts()', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockUpdateSchoolContacts = jest.fn();
      mockUpdateSchoolContacts.mockResolvedValue(undefined);
      const mockExtraArgs: ApiExtraArgs = {
        protectedApiClient: {
          ...protectedApiClient,
          updateSchoolContact: mockUpdateSchoolContacts,
        },
      };

      await updateSchoolContact(1, 1, {
        firstName: 'Bob',
        lastName: 'Smith',
        address: '1 Smith St',
        email: 'bob.smith@gmail.com',
        phone: '123-456-7890',
        type: ContactType.PRINCIPAL,
      })(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockUpdateSchoolContacts).toHaveBeenCalledTimes(1);
    });

    it('dispatches schoolContacts.failed() when API fails', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockUpdateSchoolContact = jest.fn();
      const mockAPIError = {
        response: {
          data: 'Error updating school contact',
        },
      };
      mockUpdateSchoolContact.mockRejectedValue(mockAPIError);
      const mockExtraArgs: ThunkExtraArgs = generateExtraArgs({
        protectedApiClient: {
          ...protectedApiClient,
          updateSchoolContact: mockUpdateSchoolContact,
        },
      });

      await updateSchoolContact(4, 1, {
        firstName: 'Bob',
        lastName: 'Smith',
        address: '1 Smith St',
        email: 'bob.smith@gmail.com',
        phone: '123-456-7890',
        type: ContactType.PRINCIPAL,
      })(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        1,
        schoolContacts.failed(mockAPIError.response.data),
      );
      expect(mockUpdateSchoolContact).toHaveBeenCalledTimes(1);
    });
  });

  describe('createSchoolContact', () => {
    it('calls the API route and dispatches loadSchoolContacts()', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockCreateSchoolContact = jest.fn();
      mockCreateSchoolContact.mockResolvedValue(undefined);
      const mockExtraArgs: ApiExtraArgs = {
        protectedApiClient: {
          ...protectedApiClient,
          createSchoolContact: mockCreateSchoolContact,
        },
      };

      await createSchoolContact(1, {
        firstName: 'Bob',
        lastName: 'Smith',
        address: '1 Smith St',
        email: 'bob.smith@gmail.com',
        phone: '123-456-7890',
        type: ContactType.PRINCIPAL,
      })(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockCreateSchoolContact).toHaveBeenCalledTimes(1);
    });

    it('dispatches schoolContacts.failed() when API fails', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockCreateSchoolContact = jest.fn();
      const mockAPIError = {
        response: {
          data: 'Error updating school contact',
        },
      };
      mockCreateSchoolContact.mockRejectedValue(mockAPIError);
      const mockExtraArgs: ThunkExtraArgs = generateExtraArgs({
        protectedApiClient: {
          ...protectedApiClient,
          createSchoolContact: mockCreateSchoolContact,
        },
      });

      await createSchoolContact(4, {
        firstName: 'Bob',
        lastName: 'Smith',
        address: '1 Smith St',
        email: 'bob.smith@gmail.com',
        phone: '123-456-7890',
        type: ContactType.PRINCIPAL,
      })(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        1,
        schoolContacts.failed(mockAPIError.response.data),
      );
      expect(mockCreateSchoolContact).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteSchoolContact', () => {
    it('calls the API route and dispatches loadSchoolContacts()', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockDeleteSchoolContact = jest.fn();
      mockDeleteSchoolContact.mockResolvedValue(undefined);
      const mockExtraArgs: ApiExtraArgs = {
        protectedApiClient: {
          ...protectedApiClient,
          deleteSchoolContact: mockDeleteSchoolContact,
        },
      };

      await deleteSchoolContact(1, 1)(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDeleteSchoolContact).toHaveBeenCalledTimes(1);
    });

    it('dispatches schoolContacts.failed() when API fails', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockCreateSchoolContact = jest.fn();
      const mockAPIError = {
        response: {
          data: 'Error deleting school contact',
        },
      };
      mockCreateSchoolContact.mockRejectedValue(mockAPIError);
      const mockExtraArgs: ThunkExtraArgs = generateExtraArgs({
        protectedApiClient: {
          ...protectedApiClient,
          deleteSchoolContact: mockCreateSchoolContact,
        },
      });

      await deleteSchoolContact(4, 1)(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        1,
        schoolContacts.failed(mockAPIError.response.data),
      );
      expect(mockCreateSchoolContact).toHaveBeenCalledTimes(1);
    });
  });
});

import { generateState } from '../../../auth/test/thunks.test';
import {
  ContactType,
  SchoolContactResponse,
} from '../../schoolContact/ducks/types';
import protectedApiClient, {
  ApiExtraArgs,
} from '../../../api/protectedApiClient';
import {
  createSchoolContact,
  deleteSchoolContact,
  loadSchoolContacts,
  updateSchoolContact,
} from '../../schoolContact/ducks/thunks';
import { schoolContacts } from '../../schoolContact/ducks/actions';
import { ThunkExtraArgs } from '../../../store';
import { BookLogRequest, BookLogResponse } from '../ducks/types';
import {
  createBookLog,
  deleteBookLog,
  getBookLogs,
  updateBookLog,
} from '../ducks/thunks';
import { loadBookLogs } from '../ducks/actions';

const exampleBookLogRequest: BookLogRequest = {
  count: 300,
  date: '2019-09-07T15:50:00.000Z',
  notes: '',
};

describe('Book Logs Thunks', () => {
  describe('getBookLogs', () => {
    it('dispatches a loadBookLogs.loaded() action after api success', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockGetBookLogs = jest.fn();
      const mockLogsResponse: BookLogResponse[] = [];
      mockGetBookLogs.mockResolvedValue(mockLogsResponse);
      const mockExtraArgs: ApiExtraArgs = {
        protectedApiClient: {
          ...protectedApiClient,
          getBookLogs: mockGetBookLogs,
        },
      };
      await getBookLogs(2)(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        loadBookLogs.loaded(mockLogsResponse),
      );
      expect(mockGetBookLogs).toBeCalledTimes(1);
    });

    it('dispatches loadBookLogs.failed() when API fails', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockGetBookLogs = jest.fn();
      const mockAPIError = {
        response: {
          data: 'Error fetching book logs',
        },
      };
      mockGetBookLogs.mockRejectedValue(mockAPIError);
      const mockExtraArgs: ThunkExtraArgs = {
        protectedApiClient: {
          ...protectedApiClient,
          getBookLogs: mockGetBookLogs,
        },
      };

      await getBookLogs(4)(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        loadBookLogs.failed(mockAPIError.response.data),
      );
      expect(mockGetBookLogs).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateBookLog', () => {
    it('calls the API route and dispatches getBookLogs()', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockUpdateBookLog = jest.fn();
      mockUpdateBookLog.mockResolvedValue(undefined);
      const mockExtraArgs: ApiExtraArgs = {
        protectedApiClient: {
          ...protectedApiClient,
          updateBookLog: mockUpdateBookLog,
        },
      };

      await updateBookLog(1, 1, exampleBookLogRequest)(
        mockDispatch,
        getState,
        mockExtraArgs,
      );

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockUpdateBookLog).toHaveBeenCalledTimes(1);
    });

    it('dispatches loadBookLogs.failed() when API fails', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockUpdateBookLog = jest.fn();
      const mockAPIError = {
        response: {
          data: 'Error updating book log',
        },
      };
      mockUpdateBookLog.mockRejectedValue(mockAPIError);
      const mockExtraArgs: ThunkExtraArgs = {
        protectedApiClient: {
          ...protectedApiClient,
          updateBookLog: mockUpdateBookLog,
        },
      };

      await updateBookLog(4, 1, exampleBookLogRequest)(
        mockDispatch,
        getState,
        mockExtraArgs,
      );

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        1,
        loadBookLogs.failed(mockAPIError.response.data),
      );
      expect(mockUpdateBookLog).toHaveBeenCalledTimes(1);
    });
  });

  describe('createBookLog', () => {
    it('calls the API route and dispatches getBookLogs()', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockCreateBookLog = jest.fn();
      mockCreateBookLog.mockResolvedValue(undefined);
      const mockExtraArgs: ApiExtraArgs = {
        protectedApiClient: {
          ...protectedApiClient,
          createBookLog: mockCreateBookLog,
        },
      };

      await createBookLog(1, exampleBookLogRequest)(
        mockDispatch,
        getState,
        mockExtraArgs,
      );

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockCreateBookLog).toHaveBeenCalledTimes(1);
    });

    it('dispatches getBookLogs.failed() when API fails', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockCreateBookLog = jest.fn();
      const mockAPIError = {
        response: {
          data: 'Error creating book log',
        },
      };
      mockCreateBookLog.mockRejectedValue(mockAPIError);
      const mockExtraArgs: ThunkExtraArgs = {
        protectedApiClient: {
          ...protectedApiClient,
          createBookLog: mockCreateBookLog,
        },
      };

      await createBookLog(4, exampleBookLogRequest)(
        mockDispatch,
        getState,
        mockExtraArgs,
      );

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        1,
        loadBookLogs.failed(mockAPIError.response.data),
      );
      expect(mockCreateBookLog).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteBookLog', () => {
    it('calls the API route and dispatches getBookLogs()', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockDeleteBookLog = jest.fn();
      mockDeleteBookLog.mockResolvedValue(undefined);
      const mockExtraArgs: ApiExtraArgs = {
        protectedApiClient: {
          ...protectedApiClient,
          deleteBookLog: mockDeleteBookLog,
        },
      };

      await deleteBookLog(1, 1)(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDeleteBookLog).toHaveBeenCalledTimes(1);
    });

    it('dispatches loadBookLogs.failed() when API fails', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockDeleteBookLog = jest.fn();
      const mockAPIError = {
        response: {
          data: 'Error deleting book log',
        },
      };
      mockDeleteBookLog.mockRejectedValue(mockAPIError);
      const mockExtraArgs: ThunkExtraArgs = {
        protectedApiClient: {
          ...protectedApiClient,
          deleteBookLog: mockDeleteBookLog,
        },
      };

      await deleteBookLog(4, 1)(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        1,
        loadBookLogs.failed(mockAPIError.response.data),
      );
      expect(mockDeleteBookLog).toHaveBeenCalledTimes(1);
    });
  });
});

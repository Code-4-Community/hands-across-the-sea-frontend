import {
  generateExtraArgs,
  generateState,
} from '../../../auth/test/thunks.test';
import { SchoolEntry } from '../ducks/types';
import { ThunkExtraArgs } from '../../../store';
import protectedApiClient, { WithCount } from '../../../api/protectedApiClient';
import { loadSchools } from '../ducks/thunks';
import { getAllSchools } from '../ducks/actions';

describe('School selection thunks', () => {
  describe('loadSchools', () => {
    it('calls the API and dispatches getAllSchools.loaded() action', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockGetAllSchools = jest.fn();
      const mockSchoolResponse: SchoolEntry[] = [
        {
          id: 1,
          name: 'Northeastern University',
          country: 'unitedStates',
        },
        {
          id: 2,
          name: 'Boston University',
          country: 'dominica',
        },
      ];
      mockGetAllSchools.mockResolvedValue(mockSchoolResponse);
      const mockExtraArgs: ThunkExtraArgs = generateExtraArgs({
        protectedApiClient: {
          ...protectedApiClient,
          getAllSchools: mockGetAllSchools,
        },
      });

      await loadSchools()(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        getAllSchools.loaded(mockSchoolResponse),
      );
      expect(mockGetAllSchools).toBeCalledTimes(1);
    });

    it('dispatches getAllSchools.failed() when API fails', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockGetAllSchools = jest.fn();
      const mockAPIError = {
        response: {
          data: 'An error occurred loading schools',
        },
      };
      mockGetAllSchools.mockRejectedValue(mockAPIError);
      const mockExtraArgs: ThunkExtraArgs = generateExtraArgs({
        protectedApiClient: {
          ...protectedApiClient,
          getAllSchools: mockGetAllSchools,
        },
      });

      await loadSchools()(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        getAllSchools.failed(mockAPIError.response.data),
      );
      expect(mockGetAllSchools).toBeCalledTimes(1);
    });
  });
});

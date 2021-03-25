import { generateState } from '../../../auth/test/thunks.test';
import { SchoolContactResponse } from '../ducks/types';
import protectedApiClient, {
  ApiExtraArgs,
} from '../../../api/protectedApiClient';
import { getSchoolContacts } from '../ducks/thunks';
import { schoolContacts } from '../ducks/actions';

describe('School Contacts Thunks', () => {
  describe('getSchoolContacts', () => {
    it('dispatches a schoolContacts.loaded() action after api success', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockGetSchoolContactsApi = jest.fn();
      const mockContactsResponse: SchoolContactResponse[] = [];
      mockGetSchoolContactsApi.mockResolvedValue(mockContactsResponse);
      const mockExtraArgs: ApiExtraArgs = {
        protectedApiClient: {
          ...protectedApiClient,
          getSchoolContacts: mockGetSchoolContactsApi,
        },
      };
      await getSchoolContacts(1)(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        schoolContacts.loaded(mockContactsResponse),
      );
      expect(mockGetSchoolContactsApi).toBeCalledTimes(1);
    });
  });
});

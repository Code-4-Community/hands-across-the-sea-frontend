import protectedApiClient, {
  ApiExtraArgs,
} from '../../../api/protectedApiClient';
import {
  generateExtraArgs,
  generateState,
} from '../../../auth/test/thunks.test';
import { ThunkExtraArgs } from '../../../store';
import { latestLibraryReport } from '../ducks/actions';
import { loadLatestLibraryReport } from '../ducks/thunks';
import { LibraryReportResponse } from '../ducks/types';

describe('Report With Library Thunks', () => {
  describe('getReportWithLibrary', () => {
    it('dispatches a reportWithLibrary.loaded() action after api success', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockGetReportWithLibrary = jest.fn();
      const mockReportResponse: LibraryReportResponse = {
        id: 2,
        createdAt: '',
        updatedAt: '',
        userId: 3,
        schoolId: 1,
        libraryStatus: 'EXISTS',
        numberOfChildren: null,
        numberOfBooks: null,
        mostRecentShipmentYear: null,
        isSharedSpace: null,
        hasInvitingSpace: null,
        assignedPersonRole: null,
        assignedPersonTitle: null,
        apprenticeshipProgram: null,
        trainsAndMentorsApprentices: null,
        hasCheckInTimetables: null,
        hasBookCheckoutSystem: null,
        numberOfStudentLibrarians: null,
        reasonNoStudentLibrarians: null,
        hasSufficientTraining: null,
        teacherSupport: null,
        parentSupport: null,
        visitReason: null,
        actionPlans: null,
        successStories: null,
      };

      mockGetReportWithLibrary.mockResolvedValue(mockReportResponse);
      const mockExtraArgs: ApiExtraArgs = {
        protectedApiClient: {
          ...protectedApiClient,
          getLatestReport: mockGetReportWithLibrary,
        },
      };

      await loadLatestLibraryReport(2)(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        latestLibraryReport.loaded(mockReportResponse),
      );
      expect(mockGetReportWithLibrary).toBeCalledTimes(1);
    });

    it('dispatches reportWithLibrary.failed() when API fails', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockGetReportWithLibrary = jest.fn();
      const mockAPIError = {
        response: {
          data: 'Error fetching report',
        },
      };

      mockGetReportWithLibrary.mockRejectedValue(mockAPIError);
      const mockExtraArgs: ThunkExtraArgs = generateExtraArgs({
        protectedApiClient: {
          ...protectedApiClient,
          getLatestReport: mockGetReportWithLibrary,
        },
      });

      await loadLatestLibraryReport(2)(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        latestLibraryReport.failed(mockAPIError.response.data),
      );
      expect(mockGetReportWithLibrary).toHaveBeenCalledTimes(1);
    });
  });
});

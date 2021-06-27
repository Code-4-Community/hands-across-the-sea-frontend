import { PastSubmissionsThunkAction } from './types';
import { pastSubmissionsSchools } from './actions';

export const getPastSubmissionsSchools = (): PastSubmissionsThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }): Promise<void> => {
    dispatch(pastSubmissionsSchools.loading());
    return protectedApiClient
      .getPastSubmissionSchools()
      .then((response) => {
        dispatch(pastSubmissionsSchools.loaded(response));
      })
      .catch((error) => {
        dispatch(pastSubmissionsSchools.failed(error.response.data));
      });
  };
};

import { SchoolInformationThunkAction } from '../../schoolInfo/ducks/types';
import { schoolInformation } from '../../schoolInfo/ducks/actions';
import { loadSchools } from '../../selectSchool/ducks/thunks';

export const deleteSchool = (
  schoolId: number,
): SchoolInformationThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }): Promise<void> => {
    dispatch(schoolInformation.loading());
    return protectedApiClient
      .deleteSchool(schoolId)
      .then(() => {
        dispatch(loadSchools());
      })
      .catch((error) => {
        window.location.href = "/error";
        dispatch(schoolInformation.failed(error.response.data)); // TODO: make typesafe with utils
      });
  };
};

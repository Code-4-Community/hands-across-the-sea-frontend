import { SelectSchoolThunkAction } from './types';
import { getAllSchools } from './actions';

export const loadSchools = (): SelectSchoolThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    dispatch(getAllSchools.loading());
    return protectedApiClient
      .getAllSchools()
      .then((response) => {
        dispatch(getAllSchools.loaded(response));
      })
      .catch((error) => {
        window.location.href = "/error"
        dispatch(getAllSchools.failed(error.response.data));
      });
  };
};

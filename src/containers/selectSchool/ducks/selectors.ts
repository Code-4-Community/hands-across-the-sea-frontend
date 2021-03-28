import { C4CState } from '../../../store';
import { asyncRequestIsComplete } from '../../../utils/asyncRequest';

export const selectSchools = (state: C4CState) => {
  if (asyncRequestIsComplete(state.selectSchoolState.schools)) {
    return state.selectSchoolState.schools.result;
  }
  return null;
};

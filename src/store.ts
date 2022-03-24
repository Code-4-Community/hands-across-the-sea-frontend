import { ThunkDispatch } from '@reduxjs/toolkit';
import throttle from 'lodash/throttle';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store,
} from 'redux';
import thunk from 'redux-thunk';
import protectedApiClient, { ApiExtraArgs } from './api/protectedApiClient';
import authClient from './auth/authClient';
import { UserAuthenticationActions } from './auth/ducks/actions';
import userReducer, { initialUserState } from './auth/ducks/reducers';
import {
  UserAuthenticationExtraArgs,
  UserAuthenticationReducerState,
} from './auth/ducks/types';
import { LibraryReportActions } from './containers/library-report/ducks/actions';
import libraryReportReducer, {
  initialLibraryReportState,
} from './containers/library-report/ducks/reducers';
import { LibraryReportReducerState } from './containers/library-report/ducks/types';
import { PastSubmissionsReportsActions } from './containers/pastSubmissionsReports/ducks/actions';
import pastSubmissionsReportsReducer, {
  initialPastSubmissionsReports,
} from './containers/pastSubmissionsReports/ducks/reducers';
import { PastSubmissionsReportsReducerState } from './containers/pastSubmissionsReports/ducks/types';
import { PastSubmissionsSchoolsActions } from './containers/pastSubmissionsSchools/ducks/actions';
import pastSubmissionsSchoolsReducer, {
  initialPastSubmissionsSchools,
} from './containers/pastSubmissionsSchools/ducks/reducers';
import { PastSubmissionsSchoolsReducerState } from './containers/pastSubmissionsSchools/ducks/types';
import { SelectSchoolActions } from './containers/selectSchool/ducks/actions';
import selectSchoolReducer, {
  initialSelectSchoolState,
} from './containers/selectSchool/ducks/reducers';
import { SelectSchoolReducerState } from './containers/selectSchool/ducks/types';
export interface C4CState {
  authenticationState: UserAuthenticationReducerState;
  selectSchoolState: SelectSchoolReducerState;
  libraryReportState: LibraryReportReducerState;
  pastSubmissionSchoolsState: PastSubmissionsSchoolsReducerState;
  pastSubmissionReportsState: PastSubmissionsReportsReducerState;
}

export interface Action<T, P> {
  readonly type: T;
  readonly payload: P;
}

export type C4CAction =
  | UserAuthenticationActions
  | LibraryReportActions
  | SelectSchoolActions
  | PastSubmissionsSchoolsActions
  | PastSubmissionsReportsActions;

export type ThunkExtraArgs = UserAuthenticationExtraArgs & ApiExtraArgs;

const reducers = combineReducers<C4CState, C4CAction>({
  authenticationState: userReducer,
  libraryReportState: libraryReportReducer,
  selectSchoolState: selectSchoolReducer,
  pastSubmissionSchoolsState: pastSubmissionsSchoolsReducer,
  pastSubmissionReportsState: pastSubmissionsReportsReducer,
});

export const initialStoreState: C4CState = {
  authenticationState: initialUserState,
  libraryReportState: initialLibraryReportState,
  selectSchoolState: initialSelectSchoolState,
  pastSubmissionSchoolsState: initialPastSubmissionsSchools,
  pastSubmissionReportsState: initialPastSubmissionsReports,
};

export const LOCALSTORAGE_STATE_KEY = 'state';

const loadStateFromLocalStorage = (): C4CState | undefined => {
  try {
    const serializedState = localStorage.getItem(LOCALSTORAGE_STATE_KEY);
    console.log(serializedState);
    if (serializedState === null) {
      return undefined;
    }
    const state: C4CState = JSON.parse(serializedState);
    return state;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

const preloadedState: C4CState | undefined = loadStateFromLocalStorage();

if (preloadedState) {
  console.log('Loaded state from local storage');
  console.log(preloadedState);
} else {
  console.log('No state in local storage');
}

const thunkExtraArgs: ThunkExtraArgs = {
  authClient,
  protectedApiClient,
};

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    })
  : compose;

const enhancer = composeEnhancers(
  applyMiddleware<ThunkDispatch<C4CState, ThunkExtraArgs, C4CAction>>(
    thunk.withExtraArgument(thunkExtraArgs),
  ),
);

const store: Store<C4CState, C4CAction> = createStore<
  C4CState,
  C4CAction,
  Record<string, unknown>,
  Record<string, unknown>
>(reducers, preloadedState || initialStoreState, enhancer);

store.subscribe(
  throttle(() => {
    console.log('persisting state...');
    const state: C4CState = store.getState();
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(LOCALSTORAGE_STATE_KEY, serializedState);
    } catch {
      // ignore write errors
    }
  }, 10000),
);

export default store;

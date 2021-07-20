import {
  UserAuthenticationExtraArgs,
  UserAuthenticationReducerState,
} from './auth/ducks/types';
import { UserAuthenticationActions } from './auth/ducks/actions';
import authClient from './auth/authClient';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store,
} from 'redux';
import userReducer, { initialUserState } from './auth/ducks/reducers';
import selectSchoolReducer, {
  initialSelectSchoolState,
} from './containers/selectSchool/ducks/reducers';
import { ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import AppAxiosInstance from './auth/axios';
import { asyncRequestIsComplete } from './utils/asyncRequest';
import protectedApiClient, { ApiExtraArgs } from './api/protectedApiClient';
import { SchoolInformationReducerState } from './containers/schoolInfo/ducks/types';
import { SchoolInformationActions } from './containers/schoolInfo/ducks/actions';
import schoolInformationReducer, {
  initialSchoolInfoState,
} from './containers/schoolInfo/ducks/reducers';
import { SchoolContactsActions } from './containers/schoolContact/ducks/actions';
import { SchoolContactsReducerState } from './containers/schoolContact/ducks/types';
import schoolContactsReducer, {
  initialSchoolContactsState,
} from './containers/schoolContact/ducks/reducers';
import { LibraryReportReducerState } from './containers/library-report/ducks/types';
import libraryReportReducer, {
  initialLibraryReportState,
} from './containers/library-report/ducks/reducers';
import { LibraryReportActions } from './containers/library-report/ducks/actions';
import { SelectSchoolActions } from './containers/selectSchool/ducks/actions';
import { SelectSchoolReducerState } from './containers/selectSchool/ducks/types';
import { BookLogsActions } from './containers/bookLogs/ducks/actions';
import { BookLogsReducerState } from './containers/bookLogs/ducks/types';
import bookLogsReducer, {
  initialBookLogsState,
} from './containers/bookLogs/ducks/reducers';
import { UserDirectoryReducerState } from './containers/userDirectory/ducks/types';
import { UserDirectoryActions } from './containers/userDirectory/ducks/actions';
import userDirectoryReducer, {
  initialUserDirectoryState,
} from './containers/userDirectory/ducks/reducers';
import pastSubmissionsSchoolsReducer, {
  initialPastSubmissionsSchools,
} from './containers/pastSubmissionsSchools/ducks/reducers';
import pastSubmissionsReportsReducer, {
  initialPastSubmissionsReports,
} from './containers/pastSubmissionsReports/ducks/reducers';

import { PastSubmissionsSchoolsReducerState } from './containers/pastSubmissionsSchools/ducks/types';
import { PastSubmissionsSchoolsActions } from './containers/pastSubmissionsSchools/ducks/actions';
import { PastSubmissionsReportsReducerState } from './containers/pastSubmissionsReports/ducks/types';
import { PastSubmissionsReportsActions } from './containers/pastSubmissionsReports/ducks/actions';

export interface C4CState {
  authenticationState: UserAuthenticationReducerState;
  schoolInformationState: SchoolInformationReducerState;
  schoolContactsState: SchoolContactsReducerState;
  bookLogsState: BookLogsReducerState;
  selectSchoolState: SelectSchoolReducerState;
  libraryReportState: LibraryReportReducerState;
  userDirectoryState: UserDirectoryReducerState;
  pastSubmissionSchoolsState: PastSubmissionsSchoolsReducerState;
  pastSubmissionReportsState: PastSubmissionsReportsReducerState;
}

export interface Action<T, P> {
  readonly type: T;
  readonly payload: P;
}

export type C4CAction =
  | UserAuthenticationActions
  | SchoolContactsActions
  | LibraryReportActions
  | SchoolInformationActions
  | BookLogsActions
  | SelectSchoolActions
  | UserDirectoryActions
  | PastSubmissionsSchoolsActions
  | PastSubmissionsReportsActions;

export type ThunkExtraArgs = UserAuthenticationExtraArgs & ApiExtraArgs;

const reducers = combineReducers<C4CState, C4CAction>({
  authenticationState: userReducer,
  schoolInformationState: schoolInformationReducer,
  schoolContactsState: schoolContactsReducer,
  libraryReportState: libraryReportReducer,
  bookLogsState: bookLogsReducer,
  selectSchoolState: selectSchoolReducer,
  userDirectoryState: userDirectoryReducer,
  pastSubmissionSchoolsState: pastSubmissionsSchoolsReducer,
  pastSubmissionReportsState: pastSubmissionsReportsReducer,
});

export const initialStoreState: C4CState = {
  authenticationState: initialUserState,
  schoolInformationState: initialSchoolInfoState,
  schoolContactsState: initialSchoolContactsState,
  libraryReportState: initialLibraryReportState,
  bookLogsState: initialBookLogsState,
  selectSchoolState: initialSelectSchoolState,
  userDirectoryState: initialUserDirectoryState,
  pastSubmissionSchoolsState: initialPastSubmissionsSchools,
  pastSubmissionReportsState: initialPastSubmissionsReports,
};

export const LOCALSTORAGE_STATE_KEY = 'state';

const loadStateFromLocalStorage = (): C4CState | undefined => {
  try {
    const serializedState = localStorage.getItem(LOCALSTORAGE_STATE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    const state: C4CState = JSON.parse(serializedState);
    if (asyncRequestIsComplete(state.authenticationState.tokens)) {
      AppAxiosInstance.defaults.headers['X-Access-Token'] =
        state.authenticationState.tokens.result.accessToken;
    }
    return state;
  } catch (err) {
    return undefined;
  }
};

const preloadedState: C4CState | undefined = loadStateFromLocalStorage();

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

import axios, { AxiosError, AxiosInstance } from 'axios';
import protectedApiClient from '../api/protectedApiClient';
import history from '../history';
import store from '../store';
import { asyncRequestIsComplete } from '../utils/asyncRequest';
import { default as authClient } from './authClient';
import { isTokenValid } from './ducks/selectors';
import { logout, refresh } from './ducks/thunks';
import { UserAuthenticationReducerState } from './ducks/types';

const AppAxiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const userAuthenticationExtraArgs = {
  authClient,
  protectedApiClient,
};

const INVALID_ACCESS_TOKEN = 'Given access token is expired or invalid';

const responseErrorInterceptor = (error: AxiosError) => {
  const originalRequest = {
    ...error.config,
    _retry: true,
  };

  const tokens: UserAuthenticationReducerState['tokens'] =
    store.getState().authenticationState.tokens;

  if (
    asyncRequestIsComplete(tokens) &&
    error?.response?.status === 401 &&
    error?.response?.data === INVALID_ACCESS_TOKEN &&
    isTokenValid(tokens.result.refreshToken) &&
    !(error.config as any)?._retry
  ) {
    refresh(tokens.result.refreshToken)(
      store.dispatch,
      store.getState,
      userAuthenticationExtraArgs,
    );

    return AppAxiosInstance(originalRequest);
  }
  if (
    asyncRequestIsComplete(tokens) &&
    error?.response?.status === 401 &&
    error?.response?.data === INVALID_ACCESS_TOKEN &&
    !isTokenValid(tokens.result.refreshToken)
  ) {
    logout(history)(
      store.dispatch,
      store.getState,
      userAuthenticationExtraArgs,
    );
  }
  return Promise.reject(error);
};

AppAxiosInstance.interceptors.response.use(
  (response) => response,
  responseErrorInterceptor,
);

AppAxiosInstance.interceptors.request.use((config) => {
  const tokens: UserAuthenticationReducerState['tokens'] =
    store.getState().authenticationState.tokens;
  if (asyncRequestIsComplete(tokens)) {
    config.headers['X-Access-Token'] = tokens.result.accessToken;
  }
  return config;
});

export default AppAxiosInstance;

import { History } from 'history';
import { Routes } from '../../App';
import { C4CState, LOCALSTORAGE_STATE_KEY } from '../../store';
import { asyncRequestIsComplete } from '../../utils/asyncRequest';
import AppAxiosInstance from '../axios';
import { authenticateUser, logoutUser } from './actions';
import {
  LoginRequest,
  RefreshTokenResponse,
  SignupRequest,
  TokenPayload,
  UserAuthenticationThunkAction,
} from './types';

export const login = (
  loginRequest: LoginRequest,
): UserAuthenticationThunkAction<void> => {
  return (dispatch, getState, { authClient }): Promise<void> => {
    dispatch(authenticateUser.loading());
    return authClient
      .login(loginRequest)
      .then((response: TokenPayload) => {
        AppAxiosInstance.defaults.headers['X-Access-Token'] =
          response.accessToken;
        dispatch(authenticateUser.loaded(response));
      })
      .catch((error) => {
        dispatch(authenticateUser.failed(error.response.data));
      });
  };
};

export const signup = (
  signupRequest: SignupRequest,
): UserAuthenticationThunkAction<void> => {
  return (dispatch, getState, { authClient }): Promise<void> => {
    dispatch(authenticateUser.loading());
    return authClient
      .signup(signupRequest)
      .then((response) => {
        AppAxiosInstance.defaults.headers['X-Access-Token'] =
          response.accessToken;
        dispatch(authenticateUser.loaded(response));
      })
      .catch((error) => {
        dispatch(authenticateUser.failed(error.response.data));
      });
  };
};

export const logout = (
  history: History<unknown>,
): UserAuthenticationThunkAction<void> => {
  return (dispatch, getState, { authClient }): Promise<void> => {
    const state: C4CState = getState();

    if (asyncRequestIsComplete(state.authenticationState.tokens)) {
      const refreshToken: string =
        state.authenticationState.tokens.result.refreshToken;
      return authClient
        .logout(refreshToken)
        .then(() => {
          dispatch(logoutUser.loaded());
          clearLocalStorageAndRedirect(history);
        })
        .catch(() => {
          dispatch(logoutUser.failed());
        });
    } else {
      dispatch(logoutUser.loaded());
      clearLocalStorageAndRedirect(history);
      return Promise.resolve();
    }
  };
};

const clearLocalStorageAndRedirect = (history: History): void => {
  localStorage.removeItem(LOCALSTORAGE_STATE_KEY);
  history.replace(Routes.LOGIN);
  history.go(0);
};

export const refresh = (
  refreshToken: string,
): UserAuthenticationThunkAction<void> => {
  return (dispatch, getState, { authClient }): Promise<void> => {
    dispatch(authenticateUser.loading());
    return authClient
      .refresh(refreshToken)
      .then((refreshTokenResponse: RefreshTokenResponse) => {
        dispatch(
          authenticateUser.loaded({
            accessToken: refreshTokenResponse.freshAccessToken,
            refreshToken,
          }),
        );
      })
      .catch((error) => {
        dispatch(authenticateUser.failed(error.response.data));
      });
  };
};

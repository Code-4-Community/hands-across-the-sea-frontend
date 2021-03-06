import { TokenPayload } from '../ducks/types';
import { login, signup } from '../ducks/thunks';
import { authenticateUser } from '../ducks/actions';
import authClient from '../authClient';
import protectedApiClient from '../../api/protectedApiClient';
import { C4CState, initialStoreState, ThunkExtraArgs } from '../../store';
import { Countries } from '../../utils/countries';

export const generateState = (partialState: Partial<C4CState>): C4CState => ({
  ...initialStoreState,
  ...partialState,
});

export const generateExtraArgs = (
  partialExtraArgs: Partial<ThunkExtraArgs>,
): ThunkExtraArgs => ({
  authClient,
  protectedApiClient,
  ...partialExtraArgs,
});

describe('User Authentication Thunks', () => {
  describe('login', () => {
    it('dispatches an authenticateUser.loaded() action after login', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockLogin = jest.fn();
      const mockTokenResponse: TokenPayload = {
        accessToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDQ4NzIwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.k0D1rySdVqVatWsjdA4i1YYq-7glzrL3ycSQwz-5zLU',
        refreshToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDU0NzUwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.FHgEdtz16H5u7mtTqE81N4PUsnzjvwdaJ4GK_jdLWAY',
      };
      mockLogin.mockResolvedValue(mockTokenResponse);
      const mockExtraArgs: ThunkExtraArgs = generateExtraArgs({
        authClient: {
          ...authClient,
          login: mockLogin,
        },
      });

      await login({
        email: 'Jack Blanc',
        password: 'password',
      })(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        authenticateUser.loaded(mockTokenResponse),
      );
      expect(mockLogin).toBeCalledTimes(1);
    });

    it('dispatches authenticateUser.failed() action when API fails', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockLogin = jest.fn();
      const mockAPIError = {
        response: {
          data: 'Unauthenticated user',
        },
      };
      mockLogin.mockRejectedValue(mockAPIError);
      const mockExtraArgs: ThunkExtraArgs = generateExtraArgs({
        authClient: {
          ...authClient,
          login: mockLogin,
        },
      });

      await login({
        email: 'Jack Blanc',
        password: 'password',
      })(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        authenticateUser.failed(mockAPIError.response.data),
      );
      expect(mockLogin).toBeCalledTimes(1);
    });
  });

  describe('signup', () => {
    it('dispatches an authenticateUser.loaded() action after signup', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockSignup = jest.fn();
      const mockTokenResponse: TokenPayload = {
        accessToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDQ4NzIwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.k0D1rySdVqVatWsjdA4i1YYq-7glzrL3ycSQwz-5zLU',
        refreshToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDU0NzUwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.FHgEdtz16H5u7mtTqE81N4PUsnzjvwdaJ4GK_jdLWAY',
      };
      mockSignup.mockResolvedValue(mockTokenResponse);
      const mockExtraArgs: ThunkExtraArgs = generateExtraArgs({
        authClient: {
          ...authClient,
          signup: mockSignup,
        },
      });

      await signup({
        password: 'password',
        firstName: 'Jack',
        lastName: 'Blanc',
        email: 'jack@jackblanc.com',
        country: Countries.ST_KITTS_AND_NEVIS,
      })(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        authenticateUser.loaded(mockTokenResponse),
      );
      expect(mockSignup).toBeCalledTimes(1);
    });
    it('dispatches authenticateUser.failed() action when API fails', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockSignup = jest.fn();
      const mockAPIError = {
        response: {
          data: 'Unauthenticated user',
        },
      };
      mockSignup.mockRejectedValue(mockAPIError);
      const mockExtraArgs: ThunkExtraArgs = generateExtraArgs({
        authClient: {
          ...authClient,
          signup: mockSignup,
        },
      });

      await signup({
        email: 'jblanc222@gmail.com',
        password: 'password',
        firstName: 'Jack',
        lastName: 'Blanc',
        country: Countries.ST_LUCIA,
      })(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        authenticateUser.failed(mockAPIError.response.data),
      );
      expect(mockSignup).toBeCalledTimes(1);
    });
  });
});

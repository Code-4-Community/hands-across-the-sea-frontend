import { RefreshTokenResponse, TokenResponse } from '../ducks/types';
import AuthClient, { API_ROUTE } from '../authClient';
import nock from 'nock';
import axios from '../axios';

const BASE_URL = 'http://localhost';
axios.defaults.baseURL = BASE_URL;

describe('Authentication Client Tests', () => {
  describe('Login', () => {
    it('makes the right request', async () => {
      const response: TokenResponse = {
        accessToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDQ4NzIwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.k0D1rySdVqVatWsjdA4i1YYq-7glzrL3ycSQwz-5zLU',
        refreshToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDU0NzUwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.FHgEdtz16H5u7mtTqE81N4PUsnzjvwdaJ4GK_jdLWAY',
      };

      nock(BASE_URL).post(API_ROUTE.LOGIN).reply(200, response);

      const result = await AuthClient.login({
        username: 'jackblanc',
        password: 'password',
      });

      expect(result).toEqual(response);
    });
  });

  describe('Sign Up', () => {
    it('makes the right request', async () => {
      const response: TokenResponse = {
        accessToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDQ4NzIwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.k0D1rySdVqVatWsjdA4i1YYq-7glzrL3ycSQwz-5zLU',
        refreshToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDU0NzUwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.FHgEdtz16H5u7mtTqE81N4PUsnzjvwdaJ4GK_jdLWAY',
      };

      nock(BASE_URL).post(API_ROUTE.SIGNUP).reply(200, response);

      const result = await AuthClient.signup({
        username: 'jackblanc',
        password: 'password',
        fullName: 'Jack Blanc',
        email: 'jblanc222@gmail.com',
      });

      expect(result).toEqual(response);
    });
  });

  describe('Logout', () => {
    it('makes the right request', () => {
      nock(BASE_URL).delete(API_ROUTE.LOGIN).reply(200, {});

      expect(AuthClient.logout()).resolves.toEqual({});
    });
  });

  describe('Refresh', () => {
    it('makes the right request', async () => {
      const response: RefreshTokenResponse = {
        freshAccessToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjNGMiLCJleHAiOjE2MDQ4NzIwODIsInVzZXJuYW1lIjoiamFja2JsYW5jIn0.k0D1rySdVqVatWsjdA4i1YYq-7glzrL3ycSQwz-5zLU',
      };

      nock(BASE_URL).post(API_ROUTE.REFRESH).reply(200, response);

      const result = await AuthClient.refresh();

      expect(result).toEqual(response);
    });
  });
});

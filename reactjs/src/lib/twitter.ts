import { AuthSession } from 'expo';
import axios from '~/lib/axios';

const REDIRECT_URL = AuthSession.getRedirectUrl();

export const getTwitterRequestToken = () => {
  const data = {
    redirectUri: REDIRECT_URL
  };

  return axios
    .post('/auth/twitter/request_token', data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((res: any) => res.json());
};

export const getTwitterAccessToken = (params: any) => {
  const { oauthToken, oauthTokenSecret, oauthVerifier } = params;

  const data = { oauthToken, oauthTokenSecret, oauthVerifier };

  return axios
    .post('/auth/twitter/access_token', data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((res: any) => res.json());
};

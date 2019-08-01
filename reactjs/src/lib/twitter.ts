import { AuthSession } from 'expo';
import axios from '~/lib/axios';

const REDIRECT_URL = AuthSession.getRedirectUrl();

export const getTwitterRequestToken = () => {
  const data = {
    redirect_uri: REDIRECT_URL //eslint-disable-line
  };

  return axios.post('/twitter/request_token', data).then(res => res.data);
};

export const getTwitterAccessToken = (params: any) => {
  const { oauth_token, oauth_token_secret, oauth_verifier } = params; //eslint-disable-line

  const data = { oauth_token, oauth_token_secret, oauth_verifier }; //eslint-disable-line

  return axios.post('/twitter/access_token', data);
};

export const getTwitterAccessToken2 = () => {
  return axios.get('/twitter/access_token');
};

export const TWITTER_CONSUMER_KEY =
  process.env.REACT_APP_ENV === 'development' ||
  process.env.NODE_ENV === 'development'
    ? (process.env.TWITTER_CONSUMER_KEY_DEVELOPMENT as string)
    : (process.env.TWITTER_CONSUMER_KEY_PRODUCTION as string);

export const TWITTER_CONSUMER_SECRET =
  process.env.REACT_APP_ENV === 'development' ||
  process.env.NODE_ENV === 'development'
    ? (process.env.TWITTER_CONSUMER_SECRET_DEVELOPMENT as string)
    : (process.env.TWITTER_CONSUMER_SECRET_PRODUCTION as string);

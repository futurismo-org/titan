import { AuthSession } from 'expo';
import axios from '~/lib/axios';

const REDIRECT_URL = AuthSession.getRedirectUrl();

export const getTwitterRequestToken = async () => {
  const data = {
    redirect_uri: REDIRECT_URL //eslint-disable-line
  };

  return await axios.post('/twitter/request_token', data).then(res => res.data);
};

export const getTwitterAccessToken = async (params: any) => {
  const { oauth_token, oauth_token_secret, oauth_verifier } = params; //eslint-disable-line

  const data = { oauth_token, oauth_token_secret, oauth_verifier }; //eslint-disable-line

  return await axios.post('/twitter/access_token', data);
};

import axios from '~/lib/axios';

export const requestAppleAuth = () => {
  return axios
    .post('/apple/request_auth')
    .then(res => res.data)
    .catch(res => res.data);
};

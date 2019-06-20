import axios from 'axios';

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL =
    'http://localhost:5000/titan-dev-1234/asia-northeast1/api';
} else {
  if (process.env.REACT_APP_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:5000'; // TODO
  } else {
    axios.defaults.baseURL = 'http://localhost:5000'; // TODO
  }
}

export default axios;

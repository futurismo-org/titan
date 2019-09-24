import axios from 'axios';

// if (process.env.REACT_APP_ENV === 'development') {
//   axios.defaults.baseURL =
//     'http://localhost:5000/titan-dev-1234/us-central1/api';
// } else if (process.env.NODE_ENV === 'development') {
if (
  process.env.REACT_APP_ENV === 'development' ||
  process.env.NODE_ENV === 'developement'
) {
  axios.defaults.baseURL =
    'https://us-central1-titan-dev-1234.cloudfunctions.net/api';
} else {
  axios.defaults.baseURL =
    'https://us-central1-titan-241022.cloudfunctions.net/api';
}

export default axios;

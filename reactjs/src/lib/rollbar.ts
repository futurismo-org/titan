import Rollbar from 'rollbar';

const config = {
  accessToken: '6e15d054ad6b4bd4ae8e68da0bd39c55',
  captureUncaught: true,
  captureUnhandledRejections: true,
  hostWhiteList: ['titan-fire.com', 'titan-241022.firebaseapp.com'],
  enabled: process.env.REACT_APP_ENV === 'production',
  payload: {
    environment: 'production',
    client: {
      javascript: {
        source_map_enabled: true, //eslint-disable-line
        guess_uncaught_frames: true //eslint-disable-line
      }
    }
  }
};

const rollbar = new Rollbar(config);

export default rollbar;

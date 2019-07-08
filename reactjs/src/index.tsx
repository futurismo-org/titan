import * as React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import App from './components/organisms/App';
import * as sw from './service-worker';

require('dotenv').config();

const GA_TRACKING_ID = 'UA-137986489-3';

ReactGA.initialize(GA_TRACKING_ID);

ReactDOM.render(
  <App />,
  document.getElementById('root') // eslint-disable-line no-undef
);

sw.register();

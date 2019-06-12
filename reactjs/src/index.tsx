import * as React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';
import App from './components/organisms/App';
import Head from './components/templates/Head';
import { store } from './store';

import * as sw from './service-worker';

require('dotenv').config();

const GA_TRACKING_ID = 'UA-137986489-3';

const history = createBrowserHistory();
ReactGA.initialize(GA_TRACKING_ID);
history.listen((location, action) => {
  ReactGA.pageview(location.pathname + location.search);
  console.log(location.pathname);
});

ReactDOM.render(
  <React.Fragment>
    <Head />
    <Router history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.Fragment>,
  document.getElementById('root') // eslint-disable-line no-undef
);

sw.register();

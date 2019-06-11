import * as React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import createHistory from 'history/createBrowserHistory';
import App from './components/organisms/App';
import Head from './components/templates/Head';
import { store } from './store';

import * as sw from './service-worker';

const history = createHistory();
ReactGA.initialize('UA-00000000-1');
history.listen((location, action) => {
  ReactGA.pageview(location.pathname + location.search);
  console.log(location.pathname);
});

/* eslint-disable */
ReactDOM.render(
  <React.Fragment>
    <Head />
    <Router history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.Fragment>,
  document.getElementById('root')
);

sw.register();

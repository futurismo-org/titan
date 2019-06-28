import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/organisms/App';
import Head from './components/templates/Head';
import { store } from './store';

import * as sw from './service-worker';

require('dotenv').config();

ReactDOM.render(
  <React.Fragment>
    <Head />
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.Fragment>,
  document.getElementById('root') // eslint-disable-line no-undef
);

sw.register();

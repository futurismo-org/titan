import * as React from 'react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { store, history } from '~/web/store';
import GlobalStyle from '~/lib/global-styles';
import Admin from './admin/Admin';
import Home from './Home';
import AdminRoute from '../utils/AdminRoute';
import Head from '../templates/Head';

import firebase from '~/lib/firebase';

history.listen(location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

const App = () => {
  React.useEffect(() => {
    ReactGA.pageview(window.location.pathname); // eslint-disable-line no-undef
  });

  return (
    <React.Fragment>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Router>
            <Head />
            <GlobalStyle />
            <Switch>
              <AdminRoute path="/admin" render={Admin} />
              <Route path="/" render={props => <Home {...props} />} />
            </Switch>
          </Router>
        </ReactReduxFirebaseProvider>
      </Provider>
    </React.Fragment>
  );
};

export default App;

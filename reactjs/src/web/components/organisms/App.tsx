import React, { useEffect } from 'react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { store, history } from '~/web/store';
import GlobalStyle from '~/lib/global-styles';
import Admin from '~/web/containers/AdminContainer';
import Home from '~/web/containers/HomeContainer';
import AdminRoute from '../utils/AdminRoute';
import Head from '../templates/Head';

import firebase from '~/lib/firebase';

import { initializeReactotron } from '~/web/lib/reactotron';

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

const App = (props: any) => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname); // eslint-disable-line no-undef

    if (process.env.REACT_APP_ENV === 'development') {
      initializeReactotron();
    }

    // AppleIDからのリダイレクトを処理する苦し紛れの方法
    /* eslint-disable */
    const url = location.href;
    if (url.includes('/apple/callback_auth#/')) {
      const correctURL = url.replace(
        '/apple/callback_auth#/',
        '/#/apple/callback_auth?'
      );

      window.location.href = correctURL;
    }
    /* eslint-enable */
  }, []);

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

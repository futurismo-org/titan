import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import { store, history } from '~/web/store';
import GlobalStyle from '~/lib/global-styles';
import Admin from './admin/Admin';
import Home from './Home';
import AdminRoute from '../utils/AdminRoute';
import Head from '../templates/Head';

history.listen(location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

const App = () => {
  React.useEffect(() => {
    ReactGA.pageview(window.location.pathname); // eslint-disable-line no-undef
  });

  return (
    <React.Fragment>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Head />
          <GlobalStyle />
          <Switch>
            <AdminRoute path="/admin" component={Admin} />
            <Route path="/" component={Home} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    </React.Fragment>
  );
};

export default App;
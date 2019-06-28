import * as React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import createHistory from 'history/createBrowserHistory';
import Admin from './admin/Admin';
import Home from './Home';
import AdminRoute from '../utils/AdminRoute';
import DemoLogin from './admin/DemoLogin';
import GlobalStyle from '../../lib/global-styles';
import { store } from '../../store';

const history = createHistory();
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
      <Router history={history}>
        <Provider store={store}>
          <GlobalStyle />
          <Switch>
            <Route exact path="/admin/demo/login" component={DemoLogin} />
            <AdminRoute path="/admin" component={Admin} />
            <Route path="/" component={Home} />
          </Switch>
        </Provider>
      </Router>
    </React.Fragment>
  );
};

export default App;

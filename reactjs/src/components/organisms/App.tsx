import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Admin from './admin/Admin';
import Home from './Home';
import AdminRoute from '../atoms/AdminRoute';

const App = () => (
  <React.Fragment>
    <Switch>
      <AdminRoute path="/admin" component={Admin} />
      <Route path="/" component={Home} />
    </Switch>
  </React.Fragment>
);
export default App;

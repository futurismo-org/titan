import * as React from 'react';
import { Route, Switch, NativeRouter } from 'react-router-native';
import Home from './Home';
// import Admin from './admin/Admin';
// import AdminRoute from '../atoms/AdminRoute';

const App = () => (
  <React.Fragment>
    <NativeRouter>
      <Switch>
        {/* <AdminRoute path="/admin" component={Admin} /> */}
        <Route path="/" component={Home} />
      </Switch>
    </NativeRouter>
  </React.Fragment>
);
export default App;

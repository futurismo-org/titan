import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Admin from './admin/Admin';
import Home from './Home';

const App = () => (
  <React.Fragment>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/" component={Home} />
    </Switch>
  </React.Fragment>
);
export default App;

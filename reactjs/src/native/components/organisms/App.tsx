import * as React from 'react';
import { Route, Switch, NativeRouter } from 'react-router-native';
import Home from './Home';

const App = () => (
  <React.Fragment>
    <NativeRouter>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </NativeRouter>
  </React.Fragment>
);
export default App;

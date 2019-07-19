import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, NativeRouter } from 'react-router-native';
import { store } from '~/native/store';
import Home from './Home';

const App = () => (
  <React.Fragment>
    <Provider store={store}>
      <NativeRouter>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </NativeRouter>
    </Provider>
  </React.Fragment>
);
export default App;

import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, NativeRouter, BackButton } from 'react-router-native';
import { store } from '~/native/store';
import Home from './Home';
import Hero from './Hero';

import '~/lib/fixtimerbug';

const App = () => (
  <React.Fragment>
    <Provider store={store}>
      <NativeRouter>
        <BackButton>
          <Switch>
            <Route path="/cat" component={Hero} />
            <Route path="/c" component={Hero} />
            <Route path="/" component={Home} />
          </Switch>
        </BackButton>
      </NativeRouter>
    </Provider>
  </React.Fragment>
);
export default App;

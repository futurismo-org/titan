import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, NativeRouter, BackButton } from 'react-router-native';
import * as Expo from 'expo';
import { Alert } from 'react-native';
import { store } from '~/native/store';
import Home from './Home';
import Hero from './Hero';

import '~/lib/fixtimerbug';

const App = () => {
  useEffect(() => {
    !__DEV__ && // eslint-disable-line
      Expo.Updates.checkForUpdateAsync().then(
        (update: any) =>
          update.isAvailable &&
          Expo.Updates.fetchUpdateAsync().then(() =>
            Alert.alert(
              '最新版が利用可能です',
              'アプリを再起動して今すぐ更新しますか?「いいえ」を選んだ場合、次回の起動で更新されます。',
              [
                { text: 'いいえ', onPress: () => {}, style: 'cancel' },
                {
                  text: 'はい',
                  onPress: () => {
                    Expo.Updates.reloadFromCache();
                  }
                }
              ],
              { cancelable: false }
            )
          )
      );
  });

  return (
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
};
export default App;

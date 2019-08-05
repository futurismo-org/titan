import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, NativeRouter, BackButton } from 'react-router-native';
import * as Expo from 'expo';
import * as Font from 'expo-font';
import { Alert } from 'react-native';

import { store } from '~/native/store';
import Home from './Home';
import Hero from './Hero';

import '~/lib/fixtimerbug';
import SplashHome from './Splash';

const App = () => {
  const [isSplashReady, setIsSplashReady] = useState(false);
  const [isFontReady, setIsFontReady] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      MPLUS1p: require('../../../../assets/fonts/MPLUS1p/MPLUS1p-Medium.ttf')
    }).then(() => setIsFontReady(true));

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

  const sleep = (waitSeconds: number, func: any) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(func());
      }, waitSeconds * 1000);
    });
  };

  const Splash = (prpos: any) => {
    sleep(6, () => setIsSplashReady(true));
    return <SplashHome />;
  };

  if (!isSplashReady || !isFontReady) {
    return <Splash />;
  }

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

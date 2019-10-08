import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Route, NativeRouter, BackButton, Switch } from 'react-router-native';
import * as Expo from 'expo';
import * as Font from 'expo-font';
import { Alert } from 'react-native';
import * as Sentry from 'sentry-expo';

import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

import { store } from '~/native/store';
import Home from '~/native/containers/HomeContainer';
import Hero from '~/native/containers/HeroContainer';

import { initializeReactotron } from '~/native/lib/reactotron';

import '~/lib/fixtimerbug';
import SplashHome from './Splash';

import { isAndroid, isiOS, appleIPHead } from '~/native/lib/native';
import { sleep } from '~/lib/general';

import firebase from '~/lib/firebase';
import { configDemo } from '~/lib/config';
import { getPublicIP } from '~/native/lib/network';

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

Sentry.init({
  dsn: 'https://a8a41e913c14464cafa9f8ee665956f8@sentry.io/1517744'
});

const App = (props: any) => {
  const [isSplashReady, setIsSplashReady] = useState(false);
  const [isFontReady, setIsFontReady] = useState(false);

  useEffect(() => {
    getPublicIP().then((ip: string) => {
      if (isiOS && ip.split('.')[0] === appleIPHead) {
        const app = firebase.app();
        app.delete().then(() => firebase.initializeApp(configDemo));
      }
    });

    Font.loadAsync({
      MPLUS1p: require('../../../../assets/fonts/MPLUS1p/MPLUS1p-Medium.ttf') // eslint-disable-line
    }).then(() => setIsFontReady(true));

    /* eslint-disable */
    __DEV__ && initializeReactotron();
    /* eslint-enable */

    !__DEV__ && // eslint-disable-line
    isAndroid && // Appleストアはガイドラインによってストア経由でのアプリの更新しか許可していない
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
  }, []);

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
        <ReactReduxFirebaseProvider {...rrfProps}>
          <NativeRouter>
            <BackButton>
              <Switch>
                <Route path="/cat" render={props => <Hero {...props} />} />
                <Route path="/c" render={props => <Hero {...props} />} />
                <Route
                  path="/u/:userShortId/cat/:categoryId"
                  render={props => <Home {...props} />}
                />
                <Route path="/u" render={props => <Hero {...props} />} />
                <Route path="/" render={props => <Home {...props} />} />
              </Switch>
            </BackButton>
          </NativeRouter>
        </ReactReduxFirebaseProvider>
      </Provider>
    </React.Fragment>
  );
};

export default App;

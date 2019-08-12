import { registerRootComponent } from 'expo';
import { activateKeepAwake } from 'expo-keep-awake';

import { Analytics } from 'expo-analytics';
import { Platform } from 'react-native';
import Sentry from 'sentry-expo';
import App from './native/components/organisms/App';

const GA_TRACKING_ID = 'UA-137986489-3';

(global as any).ga = new Analytics(GA_TRACKING_ID);

// expo-web is inspired or based on react-native-web
// which introduces a 'web' as platform value
if (Platform.OS !== 'web') {
  // @ts-ignore
  window = undefined; // eslint-disable-line

  import('~/native/lib/reactotron').then(() =>
    console.log('Reactotron Configured')
  );
}

// Sentry.enableInExpoDevelopment = true;
Sentry.config(process.env.SENTRY_INSTALL_URL as string).install();

/* eslint-disable */
if (__DEV__) {
  activateKeepAwake();
}
/* eslint-enable */

registerRootComponent(App as any);

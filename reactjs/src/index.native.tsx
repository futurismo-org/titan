import { registerRootComponent } from 'expo';
import { activateKeepAwake } from 'expo-keep-awake';

import { Analytics } from 'expo-analytics';
import App from './native/components/organisms/App';

const GA_TRACKING_ID = 'UA-137986489-3';

(global as any).ga = new Analytics(GA_TRACKING_ID);

/* eslint-disable */
if (__DEV__) {
  activateKeepAwake();
}
/* eslint-enable */

registerRootComponent(App as any);

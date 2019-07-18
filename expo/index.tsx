import { registerRootComponent } from 'expo';
import { activateKeepAwake } from 'expo-keep-awake';

import App from './src/components/organisms/App';

/* eslint-disable */
if (__DEV__) {
  activateKeepAwake();
}
/* eslint-enable */

registerRootComponent(App as any);

import * as React from 'react';
import { View } from 'react-native';
import { StyleProvider } from 'native-base';
import Header from '../molecules/Header';

import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';

const DefaultLayout = (props: any) => (
  <StyleProvider style={getTheme(material)}>
    <View>
      <Header />
      {props.children}
    </View>
  </StyleProvider>
);

export default DefaultLayout;

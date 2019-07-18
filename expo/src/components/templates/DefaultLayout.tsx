import * as React from 'react';
import { View } from 'react-native';
import { StyleProvider } from 'native-base';
// import * as Font from 'expo-font';
// import { Ionicons } from '@expo/vector-icons';

import Header from '../molecules/Header';

import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';

const DefaultLayout = (props: any) => {
  // useEffect(() => {
  //   Font.loadAsync({
  //     Roboto: require('../../../node_modules/native-base/Fonts/Roboto.ttf'),
  //     ...Ionicons.font
  //   });
  // }, []);

  return (
    <StyleProvider style={getTheme(material)}>
      <View>
        <Header />
        {props.children}
      </View>
    </StyleProvider>
  );
};

export default DefaultLayout;

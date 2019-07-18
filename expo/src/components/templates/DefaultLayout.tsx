import * as React from 'react';
import { View } from 'react-native';
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';

import Header from '../molecules/Header';

const uiTheme = {
  palette: {
    primaryColor: COLOR.red500,
    secondaryColor: COLOR.blue500
  },
  toolbar: {
    container: {
      height: 70
    },
    titleText: {
      fontSize: 24
    }
  }
};

const DefaultLayout = (props: any) => (
  <ThemeContext.Provider value={getTheme(uiTheme)}>
    <View>
      <Header />
      {props.children}
    </View>
  </ThemeContext.Provider>
);

export default DefaultLayout;

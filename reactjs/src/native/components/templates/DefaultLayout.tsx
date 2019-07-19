import * as React from 'react';
import { ScrollView } from 'react-native';
import { StyleProvider } from 'native-base';

import Header from '~/native/components/molecules/Header';
import getTheme from '~/native/native-base-theme/components';
import material from '~/native/native-base-theme/variables/material';

const DefaultLayout = (props: any) => {
  return (
    <StyleProvider style={getTheme(material as any)}>
      <ScrollView>
        <Header />
        {props.children}
      </ScrollView>
    </StyleProvider>
  );
};

export default DefaultLayout;

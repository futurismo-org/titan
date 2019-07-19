import * as React from 'react';
import { ScrollView } from 'react-native';
import { StyleProvider, Container, Content } from 'native-base';

import Header from '~/native/components/molecules/Header';
import getTheme from '~/native/native-base-theme/components';
import material from '~/native/native-base-theme/variables/material';

const DefaultLayout = (props: any) => {
  return (
    <StyleProvider style={getTheme(material as any)}>
      <ScrollView>
        <Container>
          <Header />
          <Content padder>{props.children}</Content>
        </Container>
      </ScrollView>
    </StyleProvider>
  );
};

export default DefaultLayout;

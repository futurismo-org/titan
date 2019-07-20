import * as React from 'react';
import { ScrollView } from 'react-native';
import { StyleProvider, Container, Content, Drawer } from 'native-base';

import Header from '~/native/components/molecules/Header';
import getTheme from '~/native/native-base-theme/components';
import material from '~/native/native-base-theme/variables/material';

const DefaultLayout = (props: any) => {
  const [drawer, setDrawer] = React.useState();

  const closeDrawer = () => {
    drawer._root.close();
  };

  const openDrawer = () => {
    drawer._root.open();
  };

  return (
    <StyleProvider style={getTheme(material as any)}>
      <ScrollView>
        <Drawer
          ref={ref => setDrawer(ref)}
          type="overlay"
          // content={<SideBar navigator={this.navigator} />}
          onClose={() => closeDrawer()}
        />
        <Container>
          <Header drawerRef={drawer} />
          <Content padder>{props.children}</Content>
        </Container>
      </ScrollView>
    </StyleProvider>
  );
};

export default DefaultLayout;

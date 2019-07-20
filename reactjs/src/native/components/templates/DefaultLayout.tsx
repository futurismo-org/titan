import * as React from 'react';
import { ScrollView } from 'react-native';
import { StyleProvider, Container, Content, Drawer } from 'native-base';

import Header from '~/native/components/molecules/Header';
import getTheme from '~/native/native-base-theme/components';
import material from '~/native/native-base-theme/variables/material';
import NavDrawer from '~/native/components/molecules/NavDrawer';

const DefaultLayout = (props: any) => {
  const [open, setOpen] = React.useState(false);

  const closeDrawer = () => {
    setOpen(false);
  };

  const openDrawer = () => {
    setOpen(true);
  };

  const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
    main: { paddingLeft: 3 }
  };

  return (
    <StyleProvider style={getTheme(material as any)}>
      <ScrollView>
        <Container>
          <Drawer
            open={open}
            type="overlay"
            content={<NavDrawer />}
            onClose={() => closeDrawer()}
            tapToClose
            openDrawerOffset={0.2} // 20% gap on the right side of drawer
            panCloseMask={0.2}
            closedDrawerOffset={-3}
            styles={drawerStyles}
            tweenHandler={(ratio: number) => ({
              main: { opacity: (2 - ratio) / 2 }
            })}
          >
            <Header openDrawer={openDrawer} />
            <Content padder>{props.children}</Content>
          </Drawer>
        </Container>
      </ScrollView>
    </StyleProvider>
  );
};

export default DefaultLayout;
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { StyleProvider, Container, Drawer, Root } from 'native-base';

import styled from 'styled-components';
import { PageHit } from 'expo-analytics';
import { withRouter } from 'react-router-native';
import Header from '~/native/containers/HeaderContainer';
import getTheme from '~/native/native-base-theme/components';
import material from '~/native/native-base-theme/variables/material';
import NavDrawer from '~/native/components/molecules/NavDrawer';

const padding = Platform.OS === 'ios' ? 0 : 20;
const isDevelopment = process.env.NODE_ENV === 'development';

const StyledContainer = styled(Container)`
  /* padding-top: ${padding}px; */
`;

const DefaultLayout = (props: any) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (!isDevelopment) {
      (global as any).ga.hit(new PageHit(props.history.location.pathname));
    }
  }, [props.history.location.pathname]);

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
    <Root>
      <StyleProvider style={getTheme(material as any)}>
        <StyledContainer>
          <Drawer
            open={open}
            type="overlay"
            content={<NavDrawer />}
            onClose={() => closeDrawer()}
            tapToClose
            openDrawerOffset={0.2}
            panCloseMask={0.2}
            closedDrawerOffset={-3}
            styles={drawerStyles}
            tweenHandler={(ratio: number) => ({
              main: { opacity: (2 - ratio) / 2 }
            })}
          >
            <Header openDrawer={openDrawer} />
            {props.children}
          </Drawer>
        </StyledContainer>
      </StyleProvider>
    </Root>
  );
};

export default withRouter(DefaultLayout);

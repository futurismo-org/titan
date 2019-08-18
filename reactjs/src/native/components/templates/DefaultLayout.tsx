import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { StyleProvider, Container, Drawer, Root } from 'native-base';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import styled from 'styled-components';
import { PageHit } from 'expo-analytics';
import { withRouter } from 'react-router-native';
import PTRView from 'react-native-pull-to-refresh';
import { hideGiphy } from '~/actions/giphyAction';
import GiphyHome from '../organisms/Giphy';
import Header from '~/native/containers/HeaderContainer';
import getTheme from '~/native/native-base-theme/components';
import material from '~/native/native-base-theme/variables/material';
import NavDrawer from '~/native/containers/NavDrawer';
import BottomNavigation from '~/native/components/molecules/BottomNavigation';

import { sleep } from '~/lib/general';

const padding = Platform.OS === 'ios' ? 0 : 20;
const isDevelopment = process.env.NODE_ENV === 'development';

const StyledContainer = styled(Container)`
  /* padding-top: ${padding}px; */
`;

const DefaultLayout = (props: any) => {
  const { showGiphy, giphyType, hideGiphy, history } = props;

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (!isDevelopment) {
      (global as any).ga.hit(new PageHit(history.location.pathname));
    }
  }, [history.location.pathname]);

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

  const Giphy = (prpos: any) => {
    sleep(8, () => hideGiphy(false));
    return <GiphyHome type={giphyType} />;
  };

  if (showGiphy) {
    return <Giphy />;
  }

  const _refresh = () => {
    return new Promise(resolve => {
      const currentPath = history.location.path;
      history.push(currentPath);
      resolve();
    });
  };

  return (
    <Root>
      <StyleProvider style={getTheme(material as any)}>
        <StyledContainer>
          <Drawer
            open={open}
            type="displace"
            content={<NavDrawer closeHandler={closeDrawer} />}
            onClose={closeDrawer}
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
            <PTRView onRefresh={_refresh}>{props.children}</PTRView>
            <BottomNavigation />
          </Drawer>
        </StyledContainer>
      </StyleProvider>
    </Root>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      hideGiphy
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  return {
    showGiphy: state.giphy.show,
    giphyType: state.giphy.type,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DefaultLayout));

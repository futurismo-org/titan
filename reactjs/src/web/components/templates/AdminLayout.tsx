import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container, { ContainerProps } from '@material-ui/core/Container';
import { MuiThemeProvider } from '@material-ui/core/styles';
import styled from 'styled-components';

import theme from 'lib/theme';
import TopToolbar from '../molecules/TopToolbar';

const LayoutWrapperContainer = styled(Container)`
  && {
    margin: 0px;
    padding: 0px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    max-width: 100%;
  }
` as React.ComponentType<ContainerProps>;

const Layout = (props: any) => (
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <LayoutWrapperContainer>
        <TopToolbar />
        <main>{props.children}</main>
      </LayoutWrapperContainer>
    </MuiThemeProvider>
  </React.Fragment>
);

export default Layout;

import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { MuiThemeProvider } from '@material-ui/core/styles';
import styled from 'styled-components';

import theme from '../../lib/theme';
import TopToolbar from '../molecules/TopToolbar';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout = (props: any) => (
  <LayoutWrapper>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <TopToolbar />
        <main>{props.children}</main>
      </Container>
    </MuiThemeProvider>
  </LayoutWrapper>
);

export default Layout;

import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Header from "../molecules/Header";

import theme from "../../lib/theme";

const Layout = props => (
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Header />
        <main>{props.children}</main>
      </Container>
    </MuiThemeProvider>
  </React.Fragment>
);

export default Layout;

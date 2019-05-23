import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import JssProvider from "react-jss/lib/JssProvider";
import { create } from "jss";
import { createGenerateClassName, jssPreset } from "@material-ui/styles";
import theme from "../../lib/theme";
import Header from "../molecules/Header";

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // Define a custom insertion for injecting the JSS styles in the DOM
  insertionPoint: document.getElementById('jss-insertion-point') // eslint-disable-line
});

const Layout = props => (
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>{props.children}</main>
      </Container>
    </MuiThemeProvider>
  </JssProvider>
);

export default Layout;

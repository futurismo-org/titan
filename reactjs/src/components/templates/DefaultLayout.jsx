import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../molecules/Header";

const Layout = props => (
  <div>
    <CssBaseline />
    <Container maxWidth="lg">
      <Header />
      <main>{props.children}</main>
    </Container>
  </div>
);

export default Layout;

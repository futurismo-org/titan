import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { ApolloProvider } from "react-apollo-hooks";
import DashBoard from "./components/organisms/DashBoard";
import client from "./lib/apollo";
import Head from "./components/templates/Head";

/* eslint-disable */
ReactDOM.render(
  <React.Fragment>
    <Head />
    <Router>
      <ApolloProvider client={client}>
        <DashBoard />
      </ApolloProvider>
    </Router>
  </React.Fragment>,
  document.getElementById('root')
);

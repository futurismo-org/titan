import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { ApolloProvider } from "react-apollo-hooks";
import DashBoard from "./components/organisms/DashBoard";
import client from "./lib/apollo";

/* eslint-disable */
ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <DashBoard />
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);

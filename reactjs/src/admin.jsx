import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { ApolloProvider } from "react-apollo-hooks";
import App from "./components/organisms/admin/App";
import client from "./lib/apollo";

/* eslint-disable */
ReactDOM.render(
  <React.Fragment>
    <Router>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Router>
  </React.Fragment>,
  document.getElementById('root')
);

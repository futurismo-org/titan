import * as React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo-hooks';
import App from './components/organisms/App';
import client from './lib/apollo';
import Head from './components/templates/Head';

/* eslint-disable */
ReactDOM.render(
  <React.Fragment>
    <Head />
    <Router>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Router>
  </React.Fragment>,
  document.getElementById('root')
);

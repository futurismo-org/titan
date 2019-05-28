import * as React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo-hooks';
import { Provider } from 'react-redux';
import App from './components/organisms/App';
import client from './lib/apollo';
import Head from './components/templates/Head';
import { store } from './store';

/* eslint-disable */
ReactDOM.render(
  <React.Fragment>
    <Head />
    <Router>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApolloProvider>
    </Router>
  </React.Fragment>,
  document.getElementById('root')
);

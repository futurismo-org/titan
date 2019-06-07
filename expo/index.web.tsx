import * as React from 'react';
import ReactDOM from 'react-dom';
import { NativeRouter } from 'react-router-native';
// import { Provider } from 'react-redux';
import App from './src/components/organisms/App';
import Head from './src/components/templates/Head';
// import { store } from './store';

/* eslint-disable */
ReactDOM.render(
  <React.Fragment>
    <Head />
    <NativeRouter>
      <App />
    </NativeRouter>
    {/* 
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router> */}
  </React.Fragment>,
  document.getElementById('root')
);

import * as React from 'react';
import ReactDOM from 'react-dom';
//import { HashRouter as Router } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import App from './components/organisms/App';
import Head from './components/templates/Head';
// import { store } from './store';

/* eslint-disable */
ReactDOM.render(
  <React.Fragment>
    <Head />    
    {/* 
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router> */}
  </React.Fragment>,
  document.getElementById('root')
);

import React, { useEffect } from 'react';
import firebase from 'firebase';
import config from '../../lib/config';

const Signin = (props: any) => {
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    const firebaseui = require('firebaseui');
    require('firebaseui/dist/firebaseui.css');

    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());

    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: (authResult: any, redirectUrl: any) => {
          return true;
        },
        uiShown: () => {
          const loader = document.getElementById('loader'); // eslint-disable-line no-undef
          if (loader) loader.style.display = 'none';
        }
      },
      signInFlow: 'popup',
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
      ],
      tosUrl: 'terms',
      privacyPolicyUrl: 'policy'
    };
    ui.start('#firebaseui-auth-container', uiConfig);
  }, []);

  return (
    <React.Fragment>
      <div id="firebaseui-auth-container" />
      <div id="loader">Now Loading...</div>
    </React.Fragment>
  );
};

export default Signin;

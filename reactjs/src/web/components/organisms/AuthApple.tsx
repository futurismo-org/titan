import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import firebase, { createCustomToken } from '~/lib/firebase';
import connect from '~/connects/AuthConnect';

const jwt = require('jsonwebtoken');

const AuthApple = (props: any) => {
  const { signInSuccessWithAuthResult, history } = props;

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const url = location.href; // eslint-disable-line
    const idToken = url.split('&id_token=')[1];
    const uid = jwt.decode(idToken).sub;

    !!uid &&
      createCustomToken(uid, false)
        .then(token => firebase.auth().signInWithCustomToken(token))
        .then(credential => signInSuccessWithAuthResult(credential))
        .then(() => window.alert('AppleIDでログインしました。')) // eslint-disable-line
        .then(() => history.push('/'));
  }, []);
  /* eslint-enable */

  return <React.Fragment />;
};

export default withRouter(connect(AuthApple));

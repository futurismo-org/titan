import React from 'react';
import firebase, { createCustomToken } from '~/lib/firebase';
import connect from '~/connects/AuthConnect';

const jwt = require('jsonwebtoken');

const AuthApple = (props: any) => {
  const { signInSuccessWithAuthResult } = props;

  const url = location.href; // eslint-disable-line
  const idToken = url.split('&id_token=')[1];
  const uid = jwt.decode(idToken).sub;

  if (!uid) return null;

  createCustomToken(uid, false)
    .then((token: string) => firebase.auth().signInWithCustomToken(token))
    .then(credential => signInSuccessWithAuthResult(credential))
    .then(() => (window.location.href = '/')); // eslint-disable-line

  return null;
};

export default connect(AuthApple);

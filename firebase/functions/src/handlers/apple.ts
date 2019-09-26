import axios from 'axios';

const appleSignin = require('apple-signin');

exports.requestAppleAuth = (req: any, res: any) => {
  const options = {
    clientID: 'com.futurismo.titan', // identifier of Apple Service ID.
    redirectUri: 'https://titan-fire.com/apple/callback_auth'
  };

  const authorizationUrl = appleSignin.getAuthorizationUrl(options);
  axios.get(authorizationUrl);
};

exports.callbackAppleAuth = (req: any, res: any) => {
  console.log(req);
};

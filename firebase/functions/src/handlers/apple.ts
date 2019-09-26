const appleSignin = require('apple-signin');

exports.requestAppleAuth = (req: any, res: any) => {
  const options = {
    clientID: 'com.futurismo.titan.web', // identifier of Apple Service ID.
    redirectUri:
      'https://us-central1-titan-241022.cloudfunctions.net/api/apple/callback_auth'
  };

  const url = appleSignin.getAuthorizationUrl(options);
  return res.status(200).json(url);
};

exports.callbackAppleAuth = (req: any, res: any) => {
  console.log(req);
  return res.status(200);
};

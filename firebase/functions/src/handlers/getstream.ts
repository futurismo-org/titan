const stream = require('getstream');

const functions = require('firebase-functions');

const GETSTREAM_SERVER_LOCATION = 'tokyo';

const client =
  process.env.APP_ENV === 'development'
    ? new stream.connect(
        process.env.GETSTREAM_KEY,
        process.env.GETSTREAM_SECRET,
        process.env.GETSTREAM_APP_ID,
        { location: GETSTREAM_SERVER_LOCATION }
      )
    : new stream.connect(
        functions.config().getstream.key,
        functions.config().getstream.secret,
        functions.config().getstream.app_id,
        { location: GETSTREAM_SERVER_LOCATION }
      );

exports.getToken = (req: any, res: any) => {
  const userId = req.body.userId;
  const userToken = client.createUserToken(userId);
  return res.status(200).json(userToken);
};

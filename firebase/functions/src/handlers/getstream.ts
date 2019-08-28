const getstream = require('getstream');

const functions = require('firebase-functions');

const GETSTREAM_SERVER_LOCATION = 'tokyo';

const client =
  process.env.APP_ENV === 'development'
    ? getstream.connect(
        process.env.GETSTREAM_KEY,
        process.env.GETSTREAM_SECRET,
        process.env.GETSTREAM_APP_ID,
        { location: GETSTREAM_SERVER_LOCATION }
      )
    : getstream.connect(
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

exports.getUserReadOnlyToken = (req: any, res: any) => {
  const userId = req.body.userId;
  const userToken = client.getReadOnlyToken('user', userId);
  return res.status(200).json(userToken);
};

exports.getTimelineReadOnlyToken = (req: any, res: any) => {
  const token = client.getReadOnlyToken('timeline', '1');
  return res.status(200).json(token);
};

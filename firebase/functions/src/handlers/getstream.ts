const getstream = require('getstream');

const functions = require('firebase-functions');

const GETSTREAM_SERVER_LOCATION = 'us-east';

const client =
  process.env.APP_ENV === 'development' ||
  process.env.APP_ENV === 'demonstration'
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
  const userId = req.body.userId;
  const token = client.getReadOnlyToken('timeline', userId);
  return res.status(200).json(token);
};

exports.getHistoryReadWriteToken = (req: any, res: any) => {
  const userId = req.body.userId;
  const token = client.getReadWriteToken('history', userId);
  return res.status(200).json(token);
};

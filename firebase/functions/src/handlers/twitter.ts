const Twitter = require('twitter-lite');

const functions = require('firebase-functions');

var multiparty = require('multiparty');

const CONSUMER_KEY =
  process.env.APP_ENV === 'development'
    ? process.env.TWITTER_CUNSUMER_KEY
    : functions.config().twitter.consumer_key;

const CONSUMER_SECRET =
  process.env.APP_ENV === 'development'
    ? process.env.TWITTER_CONSUMER_SECRET
    : functions.config().twitter.consumer_secret;

exports.postTweet = (req: any, res: any) => {
  const form = new multiparty.Form();

  form.parse(req, (err: any, fieldsObject: any) => {
    if (err) {
      console.log(err);
      res.json(err);
    }
    // const client = new Twitter({
    //   consumer_key: CONSUMER_KEY,  // eslint-disable-line
    //   consumer_secret: CONSUMER_SECRET, // eslint-disable-line
    //   access_token_key: fields.token, // eslint-disable-line
    //   access_token_secret: fields.secret // eslint-disable-line
    // });
    // client
    //   .post('media/upload', { media: fields.image })
    //   .then((media: any) => {
    //     const status = {
    //       status: fields.content,
    //       media_ids: media.media_id_string // eslint-disable-line
    //     };
    //     client.post('statuses/update', status).then((response: any) => {
    //       console.log(response);
    //     });
    //   })
    //   .then((results: any) => {
    //     res.status(200).json(results);
    //   })
    //   .catch((error: any) => {
    //     console.log(error);
    //     res.json(error);
    //   });
  });
};

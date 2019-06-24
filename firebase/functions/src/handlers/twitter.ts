const Twitter = require('twitter-lite');

const functions = require('firebase-functions');

const CONSUMER_KEY =
  process.env.APP_ENV === 'development'
    ? process.env.TWITTER_CONSUMER_KEY
    : functions.config().twitter.consumer_key;

const CONSUMER_SECRET =
  process.env.APP_ENV === 'development'
    ? process.env.TWITTER_CONSUMER_SECRET
    : functions.config().twitter.consumer_secret;

exports.postTweet = (req: any, res: any) => {
  const client = new Twitter({
    consumer_key: CONSUMER_KEY,  // eslint-disable-line
    consumer_secret: CONSUMER_SECRET, // eslint-disable-line
    access_token_key: req.body.accessTokenKey, // eslint-disable-line
    access_token_secret: req.body.accessTokenSecret // eslint-disable-line
  });

  client
    .post('statuses/update', {
      status: req.body.content
    })
    .then((results: any) => {
      console.log('results', results);
    })
    .catch(console.error);
};

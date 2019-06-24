const Twitter = require('twitter-lite');

const functions = require('firebase-functions');

exports.postTweet = (req: any, res: any) => {
  const client = new Twitter({
    // consumer_key: CONSUMER_KEY,  // eslint-disable-line
    // consumer_secret: CONSUMER_SECRET, // eslint-disable-line
    // access_token_key: titanAccessTokenKey, // eslint-disable-line
    // access_token_secret: titanAccessTokenSecret // eslint-disable-line
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

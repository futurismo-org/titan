const Twitter = require('twitter-lite');

const functions = require('firebase-functions');

// Costomer API Key
const CONSUMER_KEY = '';
const CONSUMER_SECRET = '';

exports.postTweet = (req: any, res: any) => {
  const client = new Twitter({
    // consumer_key: CONSUMER_KEY,  // eslint-disable-line
    // consumer_secret: CONSUMER_SECRET, // eslint-disable-line
    // access_token_key: TsuneraAccessTokenKey, // eslint-disable-line
    // access_token_secret: TsuneraAccessTokenSecret // eslint-disable-line
  });

  client
    .get('account/verify_credentials')
    .then((results: any) => {
      console.log('results', results);
    })
    .catch(console.error);
};

import Busboy from 'busboy';

const Twit = require('twit');

const functions = require('firebase-functions');
const OAuth = require('oauth-1.0a');
const qs = require('qs');
const HmacSHA1 = require('crypto-js/hmac-sha1');
const Base64 = require('crypto-js/enc-base64');
const fetch = require('node-fetch');

const CONSUMER_KEY =
  process.env.APP_ENV === 'development'
    ? process.env.TWITTER_CUNSUMER_KEY
    : functions.config().twitter.consumer_key;

const CONSUMER_SECRET =
  process.env.APP_ENV === 'development'
    ? process.env.TWITTER_CONSUMER_SECRET
    : functions.config().twitter.consumer_secret;

exports.postTweet = (req: any, res: any) => {
  const busboy = new Busboy({ headers: req.headers });

  let formData = new Map();

  busboy.on('error', function(error: any) {
    console.log('Busboy error catching......>>>>>>>>>>>>>>', error);
  });

  busboy.on('field', function(fieldname, val) {
    formData.set(fieldname, val);
  });

  busboy.on('finish', function() {
    const client = new Twit({
      consumer_key: CONSUMER_KEY, // eslint-disable-line
      consumer_secret: CONSUMER_SECRET, // eslint-disable-line
      access_token: formData.get('token'), // eslint-disable-line
      access_token_secret: formData.get('secret') // eslint-disable-line
    });

    client
      .post('media/upload', { media_data: formData.get('image').split(',')[1] }) // eslint-disable-line
      .then((media: any) => {
        const status = {
          status: formData.get('content'),
          media_ids: media.data.media_id_string // eslint-disable-line
        };
        client.post('statuses/update', status);
      })
      .then((results: any) => {
        res.status(200).json(results);
      })
      .catch((error: any) => {
        console.log(error);
        res.json(error);
      });
  });

  if (req.rawBody) {
    busboy.end(req.rawBody);
  } else {
    req.pipe(busboy);
  }
};

exports.requestToken = async (req: any, res: any) => {
  const { redirect_uri } = req.body; // eslint-disable-line
  const func = (baseString: string, key: string) =>
    Base64.stringify(HmacSHA1(baseString, key));

  const oauth = OAuth({
    consumer: {
      key: CONSUMER_KEY,
      secret: CONSUMER_SECRET
    },
    signature_method: 'HMAC-SHA1', // eslint-disable-line
    hash_function: func //eslint-disable-line
  });

  const requestData = {
    url: 'https://api.twitter.com/oauth/request_token',
    method: 'POST',
    data: {
      oauth_callback: redirect_uri // eslint-disable-line
    }
  };

  const response = await fetch(requestData.url, {
    method: requestData.method,
    headers: oauth.toHeader(oauth.authorize(requestData))
  });

  const text = await response.text();
  res.status = response.status;
  return res.json(qs.parse(text));
};

exports.accessToken = async (req: any, res: any) => {
  const { oauth_token, oauth_token_secret, oauth_verifier } = req.body; //eslint-disable-line

  const func = (baseString: string, key: string) =>
    Base64.stringify(HmacSHA1(baseString, key));

  const oauth = OAuth({
    consumer: {
      key: CONSUMER_KEY,
      secret: CONSUMER_SECRET
    },
    signature_method: 'HMAC-SHA1', //eslint-disable-line
    hash_function: func //eslint-disable-line
  });

  const requestData = {
    url: 'https://api.twitter.com/oauth/access_token',
    method: 'POST',
    data: {
      oauth_verifier //eslint-disable-line
    }
  };

  const headers = oauth.toHeader(
    oauth.authorize(requestData, {
      key: oauth_token, //eslint-disable-line
      secret: oauth_token_secret //eslint-disable-line
    })
  );

  const response = await fetch(requestData.url, {
    method: requestData.method,
    data: requestData.data,
    headers
  });

  res.status = response.status;
  const text = await response.text();
  return res.json(qs.parse(text));
};

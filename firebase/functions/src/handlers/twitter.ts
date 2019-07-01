import Busboy from 'busboy';

import { BitlyClient } from 'bitly';

const Twit = require('twit');

const functions = require('firebase-functions');

const BITLY_ACCESS_TOKEN =
  process.env.APP_ENV === 'development'
    ? process.env.BITLY_ACCESS_TOKEN
    : functions.config().bitly.access_token;

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

  const bitly = new BitlyClient(BITLY_ACCESS_TOKEN, {});
  const getShortURL = async (url: string) => {
    return await bitly.shorten(url);
  };

  busboy.on('finish', function() {
    const client = new Twit({
      consumer_key: CONSUMER_KEY,  // eslint-disable-line
      consumer_secret: CONSUMER_SECRET, // eslint-disable-line
      access_token: formData.get('token'), // eslint-disable-line
      access_token_secret: formData.get('secret') // eslint-disable-line
    });

    const url = formData.get('url');
    const shortURL = getShortURL(url);

    client
      .post('media/upload', { media_data: formData.get('image').split(',')[1]})  // eslint-disable-line
      .then((media: any) => {
        const status = {
          status: formData.get('content') + shortURL,
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

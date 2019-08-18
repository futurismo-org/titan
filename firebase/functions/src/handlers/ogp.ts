import * as fs from 'fs';
import admin from '../utils/admin';

const path = require('path');

// const isBot = (userAgent: any) =>
//   userAgent.includes('googlebot') ||
//   userAgent.includes('yahoou') ||
//   userAgent.includes('bingbot') ||
//   userAgent.includes('baiduspider') ||
//   userAgent.includes('yandex') ||
//   userAgent.includes('yeti') ||
//   userAgent.includes('yodaobot') ||
//   userAgent.includes('gigabot') ||
//   userAgent.includes('ia_archiver') ||
//   userAgent.includes('facebookexternalhit') ||
//   userAgent.includes('twitterbot') ||
//   userAgent.includes('developers.google.com')
//     ? true
//     : false;

exports.dashboard = (req: any, res: any) => {
  const [, , challengeId, , userShortId] = req.path.split('/');
  const resourceId = `challenges/${challengeId}/participants/${userShortId}`;

  // const userAgent = req.headers['user-agent'].toLowerCase();

  // if (!isBot(userAgent)) {
  //   return fs.readFile(
  //     path.join(__dirname, '../index.html'),
  //     'utf8',
  //     (e: any, html: any) => {
  //       html = html.replace(
  //         '<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5d15ab4135aa44bf"></script>',
  //         ''
  //       );
  //       html = html.replace(
  //         '<script src="https://embed.small.chat/TGZ3WBF55GHY896V7X.js" async></script>',
  //         `<meta http-equiv="refresh" content="0;URL=${url}"`
  //       );
  //       res.status(200).send(html);
  //     }
  //   );
  // }

  return admin
    .firestore()
    .doc(resourceId)
    .get()
    .then((doc: any) => {
      if (!doc) {
        res.status(404).end('404 Not Found');
        return;
      }

      const userItem = doc.data();
      if (!userItem) {
        res.status(404).end('404 Not Found');
        return;
      }

      const userName = userItem ? userItem.displayName : 'Annonymous';
      const challengeName = userItem ? userItem.challengeName : '';
      // const days =
      //   userItem && userItem.showMode === '過去連続日数'
      //     ? userItem.pastDays || userItem.accDays
      //     : userItem.accDays;
      // キャッシュがうまく制御できないので、日数は削除

      const title = `${userName}さんの記録 | Titan`;
      const url = `https://titan-fire.com/#/c/${challengeId}/u/${userShortId}`;
      const description = `${challengeName}に参加中。`;
      const image = userItem.photoURL
        ? userItem.photoURL
        : 'https://titan-fire.com/icon.png';
      // const logo = 'https://titan-fire.com/icon.png';

      const originalImage = image.replace('_normal.', '.');

      res.set('Cache-Control', 'public, max-age=600, s-maxage=600');

      fs.readFile(
        path.join(__dirname, '../index.html'),
        'utf8',
        (e: any, html: any) => {
          html = html.replace(
            html.match(/<meta property="og:title"[^>]*>/),
            `<meta property="og:title" content="${title}">`
          );
          html = html.replace(
            html.match(/<meta property="og:description"[^>]*>/),
            `<meta property="og:description" content="${description}">`
          );
          html = html.replace(
            html.match(/<meta property="og:url"[^>]*>/),
            `<meta property="og:url" content="${url}">`
          );
          html = html.replace(
            html.match(/<meta property="og:image"[^>]*>/),
            `<meta property="og:image" content="${originalImage}">`
          );
          html = html.replace(
            '<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5d15ab4135aa44bf"></script>',
            ``
          );
          html = html.replace(
            '<script src="https://embed.small.chat/TGZ3WBF55GHY896V7X.js" async></script>',
            `<meta http-equiv="refresh" content="0;URL=${url}">`
          );
          res.status(200).send(html);
        }
      );
    })
    .catch((err: any) => {
      console.error(err);
    });
};

exports.topic = (req: any, res: any) => {
  const [, collectionShort, collectionId, , topicId] = req.path.split('/');

  const collection =
    collectionShort === 'c'
      ? 'challenges'
      : collectionShort === 'cat'
      ? 'categories'
      : '';

  const resourceId =
    collection === ''
      ? `/topics/${collectionId}` // collectionIdの位置にtopicIDがはいっているはず。
      : `/${collection}/${collectionId}/topics/${topicId}`;

  return admin
    .firestore()
    .doc(resourceId)
    .get()
    .then((doc: any) => {
      if (!doc) {
        res.status(404).end('404 Not Found');
        return;
      }
      const topicItem = doc.data();

      const topicTitle = topicItem ? topicItem.title : '';
      const topicText = topicItem ? topicItem.text.substr(0, 80) + '...' : '';

      const title = `${topicTitle} | Titan`;
      const description = topicText;
      const url =
        collection === ''
          ? `https://titan-fire.com/#/topics/${collectionId}`
          : `https://titan-fire.com/#/${collectionShort}/${collectionId}/t/${topicId}`;

      res.set('Cache-Control', 'public, max-age=600, s-maxage=600');

      fs.readFile(
        path.join(__dirname, '../index.html'),
        'utf8',
        (e: any, html: any) => {
          html = html.replace(
            html.match(/<meta property="og:title"[^>]*>/),
            `<meta property="og:title" content="${title}">`
          );
          html = html.replace(
            html.match(/<meta property="og:description"[^>]*>/),
            `<meta property="og:description" content="${description}">`
          );
          html = html.replace(
            html.match(/<meta property="og:url"[^>]*>/),
            `<meta property="og:url" content="${url}">`
          );
          html = html.replace(
            '<script src="https://embed.small.chat/TGZ3WBF55GHY896V7X.js" async></script>',
            `<meta http-equiv="refresh" content="0;URL=${url}">`
          );
          res.status(200).send(html);
        }
      );
    })
    .catch((err: any) => {
      console.error(err);
    });
};

exports.challenge = (req: any, res: any) => {
  const [, , challengeId, ,] = req.path.split('/');
  const resourceId = `challenges/${challengeId}`;

  return admin
    .firestore()
    .doc(resourceId)
    .get()
    .then((doc: any) => {
      if (!doc) {
        res.status(404).end('404 Not Found');
        return;
      }
      const challengeItem = doc.data();

      const challengeName = challengeItem ? challengeItem.title : '';
      const challengeDescription = challengeItem
        ? challengeItem.description
        : '';
      // const participantsCount = challengeItem
      //   ? challengeItem.participantsCount
      //   : 0;

      const title = `${challengeName} | Titan`;
      const description = `きみも参加しよう！ ${challengeDescription}`;
      const url = `https://titan-fire.com/#/c/${challengeId}`;

      res.set('Cache-Control', 'public, max-age=600, s-maxage=600');

      fs.readFile(
        path.join(__dirname, '../index.html'),
        'utf8',
        (e: any, html: any) => {
          html = html.replace(
            html.match(/<meta property="og:title"[^>]*>/),
            `<meta property="og:title" content="${title}">`
          );
          html = html.replace(
            html.match(/<meta property="og:description"[^>]*>/),
            `<meta property="og:description" content="${description}">`
          );
          html = html.replace(
            html.match(/<meta property="og:url"[^>]*>/),
            `<meta property="og:url" content="${url}">`
          );
          html = html.replace(
            '<script src="https://embed.small.chat/TGZ3WBF55GHY896V7X.js" async></script>',
            `<meta http-equiv="refresh" content="0;URL=${url}">`
          );
          res.status(200).send(html);
        }
      );
    })
    .catch((err: any) => {
      console.error(err);
    });
};

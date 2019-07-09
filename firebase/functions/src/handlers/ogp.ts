import { DocumentSnapshot } from '@google-cloud/firestore';
import * as fs from 'fs';
import { functions } from '../utils/admin';

// const functions = require('firebase-functions');
// const admin = require('../utils/admin');

// const createDashBoardHtml = (
//   challengeId: string,
//   userShortId: string,
//   title: string,
//   description: string,
//   url: string
// ) => {
//   return `
//   <!DOCTYPE html>
//   <html>
//     <head>
//       <meta charset="utf-8">
//       <meta name="viewport" content="width=device-width,initial-scale=1.0">
//       <title>colorinco</title>
//       <meta property="og:title" content="${title}">
//       <meta property="og:description" content="${description}">
//       <meta property="og:url" content="${url}">
//       <meta property="og:type" content="article">
//       <meta property="og:site_name" content="Titan">
//       <meta name="twitter:card" content="summary">
//     </head>
//     <body>
//       <script type="text/javascript">window.location="/_c/${challengeId}/_u/${userShortId}";</script>
//     </body>
//   </html>
//   `;
// };

exports.dashboard = (req: any, res: any) => {
  // const [, , challengeId, , userShortId] = req.path.split('/');
  const challengeId = req.params.cid;
  const userShortId = req.params.uid;

  return functions
    .collection('challenges')
    .doc(challengeId)
    .collection('participants')
    .doc(userShortId)
    .get()
    .then((snap: DocumentSnapshot) => {
      if (!snap) {
        res.status(404).end('404 Not Found');
        return;
      }
      const userItem = snap ? snap.data() : {};
      const userName = userItem ? userItem.displayName : '';
      const challengeName = userItem ? userItem.challengeName : '';
      const accDays = userItem ? userItem.accDays : 0;

      const title = `${userName}さんの記録 | Titan`;
      const description = `${challengeName}に参加中。${accDays}日達成しました！`;
      const url = `https://titan-fire.com/c/${challengeId}/u/${userShortId}`;

      // const html = createDashBoardHtml(
      //   challengeId,
      //   userShortId,
      //   title,
      //   description,
      //   url
      // );

      res.set('Cache-Control', 'public, max-age=600, s-maxage=600');
      fs.readFile('./index.html', 'utf8', (e: any, html: any) => {
        const responseHtml = html
          .replace(/\<title>.*<\/title>/g, '<title>' + title + '</title>')
          .replace(
            /(<meta id="description".*content=")(.*)" \/>/g,
            '$1' + description + ''
          );
        res.status(200).send(responseHtml);
      });
    })
    .catch((err: any) => {
      console.warn(err);
    });
};

exports.topic = (req: any, res: any) => {};

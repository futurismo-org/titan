import * as fs from 'fs';

const defaultDesc =
  'オナ禁・エロ禁を中心とした、自分を変える若者のためのアプリです。自己変革を支援します。';
const defaultTitle = 'Titan | 自己変革の火をつけるアプリ';
const defaultLogo = 'https://titan-fire.com/icon.png';

const getOpenGraph = (org: any) => {
  let og = `<meta property="fb:app_id" content="921373517372" />`; // TODO
  og += `<meta property="og:type" content="article" />`;

  if (!org) {
    og += `<meta property="og:title" content="${defaultTitle}" />`;
    og += `<meta property="og:description" content="${defaultDesc}" />`;
    og += `<meta property="og:image" content="${defaultLogo}" />`;
    og += `<meta property="og:url" content="https://titan-fire.com" />`;
    return og;
  }
  og += `<meta property="og:title" content="${org.title}" />`;
  og += `<meta property="og:description" content="${org.description ||
    defaultDesc}" />`;
  og += `<meta property="og:image" content="${org.logo_url || defaultLogo}" />`;
  og += `<meta property="og:url" content="https://titan-fire.com/c/${
    org.challengeId
  }/u/${org.userId}" />`;
  return og;
};

const getMeta = (org: any) => {
  // return other meta tags
  let meta = '';
  return meta;
};

exports.host = (req: any, res: any) => {
  const userAgent = req.headers['user-agent'].toLowerCase();
  let indexHTML = fs.readFileSync('./hosting/index.html').toString();
  const path = req.path ? req.path.split('/') : req.path;
  const ogPlaceholder = '<meta name="functions-insert-dynamic-og">';
  const metaPlaceholder = '<meta name="functions-insert-dynamic-meta">';

  const isBot =
    userAgent.includes('googlebot') ||
    userAgent.includes('yahoou') ||
    userAgent.includes('bingbot') ||
    userAgent.includes('baiduspider') ||
    userAgent.includes('yandex') ||
    userAgent.includes('yeti') ||
    userAgent.includes('yodaobot') ||
    userAgent.includes('gigabot') ||
    userAgent.includes('ia_archiver') ||
    userAgent.includes('facebookexternalhit') ||
    userAgent.includes('twitterbot') ||
    userAgent.includes('developers.google.com')
      ? true
      : false;

  if (isBot && (path && path.length > 1 && path[1] === 'organisation')) {
    const slug = path[2];
    admin
      .database()
      .ref(`published/${slug}`)
      .once('value')
      .then(snapshot => {
        const org = snapshot.val();
        if (org) {
          org.slug = slug;
        }
        indexHTML = indexHTML.replace(metaPlaceholder, getMeta(org));
        indexHTML = indexHTML.replace(ogPlaceholder, getOpenGraph(org));
        res.status(200).send(indexHTML);
      });
    return;
  }

  // optional - turn on caching: res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  indexHTML = indexHTML.replace(metaPlaceholder, getMeta());
  indexHTML = indexHTML.replace(ogPlaceholder, getOpenGraph());
  res.status(200).send(indexHTML);
};

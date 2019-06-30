import * as React from 'react';
import Helmet from 'react-helmet';

const { PUBLIC_URL } = process.env;

const Head = () => {
  const title = 'Titan | 自己変革の火をつけるアプリ';
  const description =
    'オナ禁・エロ禁を中心とした、自己変革を支援するアプリです。継続できない、情報不足、自己嫌悪感という３つの課題に取り組みます。';

  const urlMap = new Map();
  urlMap.set('development', 'https://titan-dev-1234.firebaseapp.com');
  urlMap.set('production', 'https://titan-fire.com');
  const url = urlMap.get(process.env.REACT_APP_ENV);

  return (
    <Helmet>
      <Helmet
        title={title}
        meta={[
          {
            property: 'og:image',
            content:
              'https://titan-fire.netlify.com/dist/images/icon-256x256.png'
          },
          { property: 'og:url', content: url },
          { property: 'og:type', content: 'article' },
          { property: 'og:title', content: title },
          { property: 'og:description', content: description },
          { property: 'og:site_name', content: 'Titan' },
          { name: 'twitter:card', content: 'summary' },
          { name: 'twitter:site', content: '@titan_dev_1234' },
          {
            name: 'twitter:image',
            content:
              'https://titan-fire.netlify.com/dist/images/icon-256x256.png'
          },
          { name: 'fragment', content: '!' }
        ]}
      />{' '}
      <link rel="shortcut icon" href={`${PUBLIC_URL}/favicon.ico`} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <link rel="manifest" href={`${PUBLIC_URL}/manifest.json`} />
      <script src="https://js.stripe.com/v3/" />
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Head;

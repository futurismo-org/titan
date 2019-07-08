import * as React from 'react';
import Helmet from 'react-helmet';
import * as AppInfo from '../../constants/appInfo';

const { PUBLIC_URL } = process.env;

const Head = () => {
  const title = AppInfo.APP_TITLE;
  const description = AppInfo.APP_DESCRIPTION;
  const url = AppInfo.APP_URL;

  return (
    <Helmet
      title={title}
      meta={[
        {
          property: 'og:image',
          content: AppInfo.APP_ICON_URL
        },
        { property: 'og:url', content: url },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:site_name', content: AppInfo.APP_NAME },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '@titan_dev_1234' },
        {
          name: 'twitter:image',
          content: AppInfo.APP_ICON_URL
        },
        { name: 'fragment', content: '!' }
      ]}
    >
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

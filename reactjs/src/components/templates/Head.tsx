import * as React from 'react';
import Helmet from 'react-helmet';

import rollbarSnippet from '../../lib/rollbar';

const { PUBLIC_URL } = process.env;

const Head = () => {
  return (
    <Helmet>
      <link rel="shortcut icon" href={`${PUBLIC_URL}/favicon.ico`} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <link rel="manifest" href={`${PUBLIC_URL}/manifest.json`} />
      <script src="https://js.stripe.com/v3/" />
      <title>Titan App</title>
      <meta
        name="google-site-verification"
        content="CdxVY4YxFr0MeTi2TyoLcCi0XYf2st5HRz3sxmV2QrI"
      />
    </Helmet>
  );
};

export default Head;

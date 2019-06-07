import * as React from 'react';
import Helmet from 'react-helmet';

// const { PUBLIC_URL } = env;

const Head = () => (
  <Helmet>
    {/* <link rel="shortcut icon" href={`${PUBLIC_URL}/favicon.ico`} />  よくわからない。*/}
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    {/* <link rel="manifest" href={`${PUBLIC_URL}/manifest.json`} />  よくわからない。*/}
    <title>Titan App</title>
  </Helmet>
);

export default Head;

import React from "react";
import Helmet from "react-helmet";

const PUBLIC_URL = "https://titan-dev-1234.firebaseapp.com";

const Head = () => (
  <Helmet>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href={`${PUBLIC_URL}/favicon.ico`} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <link rel="manifest" href={`${PUBLIC_URL}/manifest.json`} />
    <title>Titan App</title>
  </Helmet>
);

export default Head;

import * as React from 'react';
import Helmet from 'react-helmet';

const { PUBLIC_URL } = process.env;

const Head = () => {
  return (
    <Helmet>
      <link rel="shortcut icon" href={`${PUBLIC_URL}/favicon.ico`} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <link rel="manifest" href={`${PUBLIC_URL}/manifest.json`} />
      <script src="https://js.stripe.com/v3/" />
      <title>Titan | 自己変革の火をつけるアプリ</title>
      <meta
        name="description"
        content="オナ禁・エロ禁を中心とした、自己変革を支援するアプリです。継続できない、情報不足、自己嫌悪感という３つの課題に取り組みます。"
      />
    </Helmet>
  );
};

export default Head;

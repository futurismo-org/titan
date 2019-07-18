import * as React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as AppInfo from '../../constants/appInfo';

const Head = (props: any) => {
  const title = props.title + ' | ' + AppInfo.APP_NAME || AppInfo.APP_TITLE;
  const description = props.description || AppInfo.APP_DESCRIPTION;
  // const url = props.url || AppInfo.APP_URL;

  return (
    <Helmet>
      <link rel="shortcut icon" href={`${AppInfo.APP_URL}/favicon.ico`} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <link rel="manifest" href={`${AppInfo.APP_URL}/manifest.json`} />
      <script src="https://js.stripe.com/v3/" />
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

const mapStateToProps = (state: any) => ({
  title: state.ogp.title,
  description: state.ogp.description,
  url: state.ogp.url
});

export default connect(mapStateToProps)(Head);

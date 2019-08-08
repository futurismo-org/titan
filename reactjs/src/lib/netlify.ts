const NetlifyAPI = require('netlify');

const siteId = '026f07e0-10b7-4e11-938a-fe23f4bafeec';
const client = new NetlifyAPI(process.env.REACT_APP_NETLIFY_ACCESS_TOKEN);

/* eslint-disable @typescript-eslint/camelcase */

export const getSubmissions = () =>
  client.listSiteSubmissions({
    site_id: siteId
  });

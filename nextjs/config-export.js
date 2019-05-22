const challengesQuery = require("./queries/challenges-query");
const configs = require("./env.config");

const endpoint =
  "https://asia-northeast1-titan-dev-1234.cloudfunctions.net/api";

const typeParams = [
  {
    pageComponent: "challenge",
    contentType: "challenges",
    query: challengesQuery,
    urlBase: "challenges",
    perPage: 100,
    endpoint
  }
];

module.exports = {
  typeParams
};

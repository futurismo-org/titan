import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "node-fetch";

const client = new ApolloClient({
  link: createHttpLink({
    uri: "https://asia-northeast1-titan-dev-1234.cloudfunctions.net/api",
    fetch
  }),
  cache: new InMemoryCache()
});

export default client;

import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "node-fetch";

const client = new ApolloClient({
  link: createHttpLink({
    uri: process.env.TARGET_URI || "http://localhost:5000",
    fetch
  }),
  cache: new InMemoryCache()
});

export default client;

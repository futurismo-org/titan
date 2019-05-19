import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "node-fetch";
import configs from "../env.config";

const client = new ApolloClient({
  link: createHttpLink({
    uri: configs.api,
    fetch
  }),
  cache: new InMemoryCache()
});

export default client;

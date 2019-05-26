import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-fetch';

const API_URL_LOCAL =
  'http://localhost:5000/titan-dev-1234/asia-northeast1/api';

const API_URL_REMOTE =
  'https://asia-northeast1-titan-dev-1234.cloudfunctions.net/api';

const API_URL =
  process.env.NODE_ENV === 'production' ? API_URL_REMOTE : API_URL_LOCAL;

const client = new ApolloClient({
  link: createHttpLink({
    uri: API_URL,
    fetch
  }),
  cache: new InMemoryCache()
});

export default client;

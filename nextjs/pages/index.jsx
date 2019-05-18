import React from "react";
import { Query, ApolloProvider } from "react-apollo";
import gql from "graphql-tag";
import client from "../lib/apollo";

const GET_GROUPS = gql`
  {
    groups {
      id
      name
      count
    }
  }
`;

const Home = () => (
  <ApolloProvider client={client}>
    <ul>
      <Query query={GET_GROUPS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return data.groups.map(group => <li key={group.id}>{group.name}</li>);
        }}
      </Query>
    </ul>
  </ApolloProvider>
);

export default Home;

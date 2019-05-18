import React from "react";
import { Query, ApolloProvider } from "react-apollo";
import gql from "graphql-tag";
import client from "../lib/apollo";

const GET_GROUPS = gql`
  {
    groups {
      name
      count
    }
  }
`;

const Home = () => (
  <ApolloProvider client={client}>
    <Query query={GET_GROUPS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        const { groups } = data;
        return <div>{groups}</div>;
      }}
    </Query>
  </ApolloProvider>
);

export default Home;

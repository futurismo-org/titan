import React from "react";
import { Query, ApolloProvider, Mutation } from "react-apollo";
import gql from "graphql-tag";
import client from "../lib/apollo";
import Layout from "../components/templates/MyLayout";

const GET_GROUPS = gql`
  {
    groups {
      id
      name
      count
    }
  }
`;

const ADD_GROUP = gql`
  mutation addGroup {
    addGroup(name: "オナ禁") {
      id
      name
      count
    }
  }
`;

const Home = () => (
  <Layout>
    <ApolloProvider client={client}>
      <ul>
        <Query query={GET_GROUPS}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            return data.groups.map(group => (
              <li key={group.id}>{group.name}</li>
            ));
          }}
        </Query>
      </ul>
      <Mutation mutation={ADD_GROUP}>
        {(addGroup, { data, loading, error }) => (
          <button type="button" onClick={addGroup}>
            Add
          </button>
        )}
      </Mutation>
    </ApolloProvider>
  </Layout>
);

export default Home;

import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import Header from "../molecules/challenges/ChallengeHeader";
import Body from "../molecules/challenges/ChallengeBody";
import Navbar from "../molecules/challenges/ChallengeNavbar";

const GET_CHALLENGE = gql`
  query GetChallenge($id: ID!) {
    challenge(id: $id) {
      id
      title
      discription
    }
  }
`;

const Challenge = props => {
  const { data, error, loading } = useQuery(GET_CHALLENGE, {
    variables: { id: props.match.params.id }
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  const { challenge } = data;

  return (
    <React.Fragment>
      <Header challenge={challenge} />
      <Navbar id={challenge.id} />
      <Body />
    </React.Fragment>
  );
};

export default Challenge;

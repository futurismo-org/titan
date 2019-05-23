import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import Header from "../molecules/challenges/ChallengeHeader";
import Body from "../molecules/challenges/ChallengeBody";
import Navbar from "../molecules/challenges/ChallengeNavbar";

import theme from "../../lib/theme";

const GET_CHALLENGE = gql`
  query GetChallenge($id: ID!) {
    challenge(id: $id) {
      id
      title
      discription
    }
  }
`;

const StyledPaper = styled(Paper)`
  padding: ${theme.spacing(3, 2)};
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
      <StyledPaper>
        <Navbar id={challenge.id} />
        <Body />
      </StyledPaper>
    </React.Fragment>
  );
};

export default Challenge;

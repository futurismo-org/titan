import Paper from '@material-ui/core/Paper';
import * as React from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import theme from '../../lib/theme';
import Navbar from '../molecules/challenges/ChallengeNavbar';
import Header from '../molecules/challenges/ChallengeHeader';
import Body from '../molecules/challenges/ChallengeBody';

const GET_CHALLENGE = gql`
  query GetChallenge($id: ID!) {
    challenge(id: $id) {
      id
      title
      description
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

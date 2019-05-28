import Paper from '@material-ui/core/Paper';
import * as React from 'react';
import styled from 'styled-components';
import theme from '../../lib/theme';
import Navbar from '../molecules/challenges/ChallengeNavbar';
import Header from '../molecules/challenges/ChallengeHeader';
import Body from '../molecules/challenges/ChallengeBody';
import { useChallengeQuery } from '../../gen/graphql-client-api';

const StyledPaper = styled(Paper as React.SFC)`
  padding: ${theme.spacing(3, 2)};
`;

interface Props {
  match: {
    params: {
      id?: string;
    };
  };
}

const Challenge = (props: Props) => {
  const { data, error, loading } = useChallengeQuery({
    variables: { id: props.match.params.id as string }
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  const challenge = data && data.challenge;

  return (
    <React.Fragment>
      <Header challenge={challenge} />
      <StyledPaper>
        <Navbar id={challenge!.id} />
        <Body />
      </StyledPaper>
    </React.Fragment>
  );
};

export default Challenge;

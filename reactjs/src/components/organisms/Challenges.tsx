import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

import theme from '../../lib/theme';
import ChallengeCard from '../atoms/ChallengeCard';

import { useChallengesQuery } from '../../gen/graphql-client-api';

interface Props {
  container?: any;
  spacing?: number;
}

const StyledCardGrid = styled(Grid as React.SFC<Props>)`
  && {
    margin-top: ${theme.spacing(3)}px;
  }
`;

const Challenges = () => {
  const { data, error, loading } = useChallengesQuery();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  const challenges = data && data.challenges;

  return (
    <React.Fragment>
      <StyledCardGrid container spacing={4}>
        {challenges!.map((challenge: any) => (
          <ChallengeCard challenge={challenge} key={challenge.id} />
        ))}
      </StyledCardGrid>
    </React.Fragment>
  );
};

export default Challenges;

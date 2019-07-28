import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import theme from '~/lib/theme';
import ChallengeCard from '../atoms/challenges/ChallengeCard';

import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';
import Paper from '../templates/PaperWrapper';

interface Props {
  container?: any;
  spacing?: number;
}

const StyledCardGrid = styled(Grid as React.SFC<Props>)`
  && {
    margin-top: ${theme.spacing(3)}px;
  }
`;

const Challenges = (props: any) => {
  const {
    preOpenChallenges,
    openingChallenges,
    closedChallenges,
    error,
    loading,
    fetchChallenges
  } = props;

  React.useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      <Paper>
        <Title text="開催中のチャレンジ" />
        {openingChallenges && (
          <StyledCardGrid container spacing={4}>
            {openingChallenges.map((challenge: any) => (
              <ChallengeCard challenge={challenge} key={challenge.id} />
            ))}
          </StyledCardGrid>
        )}
      </Paper>
      <Paper>
        <Title text="開催前のチャレンジ" />
        {preOpenChallenges && (
          <StyledCardGrid container spacing={4}>
            {preOpenChallenges.map((challenge: any) => (
              <ChallengeCard challenge={challenge} key={challenge.id} />
            ))}
          </StyledCardGrid>
        )}
      </Paper>
      <Paper>
        <Title text="開催終了のチャレンジ" />
        {closedChallenges && (
          <StyledCardGrid container spacing={4}>
            {closedChallenges.map((challenge: any) => (
              <ChallengeCard challenge={challenge} key={challenge.id} />
            ))}
          </StyledCardGrid>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default Challenges;

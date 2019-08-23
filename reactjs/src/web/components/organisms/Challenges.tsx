import * as React from 'react';
import Grid, { GridProps } from '@material-ui/core/Grid';
import styled from 'styled-components';
import theme from '~/lib/theme';
import CollectionCard from '~/web/containers/CollectionCardContainer';

import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';
import Paper from '../templates/PaperWrapper';
import { isReady } from '~/lib/firebase';

const StyledCardGrid = styled(Grid)`
  && {
    margin-top: ${theme.spacing(3)}px;
  }
` as React.ComponentType<GridProps>;

const Challenges = (props: any) => {
  const {
    preOpenChallenges,
    openingChallenges,
    closedChallenges,
    challenges
  } = props;

  return (
    <React.Fragment>
      {!isReady(challenges) && <Progress />}
      <Paper>
        <Title text="開催中のチャレンジ" />
        {openingChallenges && (
          <StyledCardGrid container spacing={4}>
            {openingChallenges.map((challenge: any) => (
              <CollectionCard
                type="challenges"
                collection={challenge}
                key={challenge.id}
              />
            ))}
          </StyledCardGrid>
        )}
      </Paper>
      <Paper>
        <Title text="開催前のチャレンジ" />
        {preOpenChallenges && (
          <StyledCardGrid container spacing={4}>
            {preOpenChallenges.map((challenge: any) => (
              <CollectionCard
                type="challenges"
                collection={challenge}
                key={challenge.id}
              />
            ))}
          </StyledCardGrid>
        )}
      </Paper>
      <Paper>
        <Title text="開催終了のチャレンジ" />
        {closedChallenges && (
          <StyledCardGrid container spacing={4}>
            {closedChallenges.map((challenge: any) => (
              <CollectionCard
                type="challenges"
                collection={challenge}
                key={challenge.id}
              />
            ))}
          </StyledCardGrid>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default Challenges;

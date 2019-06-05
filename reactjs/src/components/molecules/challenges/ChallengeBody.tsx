import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import ChallengeOverview from './ChallengeOverview';
import ChallengeDiscussion from './ChallengeDiscussion';
import ChallengeRules from './ChallengeRules';
import ChallengePosts from './ChallengePosts';

import theme from '../../../lib/theme';
import ChallengeLeaderBoard from './ChallengeLeaderBoard';

const ChallengeContent = styled.div`
  padding: ${theme.spacing(2)}px;
`;

const ChallengeBody = (props: any) => {
  const { challenge } = props;
  return (
    <ChallengeContent>
      <Switch>
        <Route
          path="/challenges/:id/overview"
          render={() => <ChallengeOverview text={challenge.overview} />}
        />
        <Route
          path="/challenges/:id/discussion"
          component={ChallengeDiscussion}
        />
        <Route
          path="/challenges/:id/rules"
          render={() => <ChallengeRules text={challenge.rules} />}
        />
        <Route
          path="/challenges/:id/leaderboard"
          component={ChallengeLeaderBoard}
        />
        <Route path="/challenges/:id/posts" component={ChallengePosts} />
      </Switch>
    </ChallengeContent>
  );
};

export default ChallengeBody;

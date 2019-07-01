import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import ChallengeTopics from './ChallengeTopics';
import ChallengeTimeline from './ChallengeTimeline';
import Topic from '../Topic';

import theme from '../../../lib/theme';
import ChallengeLeaderBoard from './ChallengeLeaderBoard';
import TopicForm from '../TopicForm';
import ChallengeUserDashBoard from './ChallengeUserDashBoard';
import MarkdownView from '../../atoms/MarkdownView';

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
          render={() => <MarkdownView text={challenge.overview} />}
        />
        <Route
          path="/challenges/:id/timeline"
          render={() => <ChallengeTimeline channelId={challenge.channelId} />}
        />
        <Route
          path="/challenges/:collectionId/topics/:topicId/edit"
          render={props => <TopicForm collection="challenges" {...props} />}
        />
        <Route
          path="/challenges/:collectionId/topics/new"
          render={props => <TopicForm collection="challenges" {...props} />}
        />
        <Route
          path="/challenges/:collectionId/topics/:topicId"
          render={props => <Topic collection="challenges" {...props} />}
        />
        <Route path="/challenges/:id/topics" component={ChallengeTopics} />
        <Route
          path="/challenges/:id/rules"
          render={() => <MarkdownView text={challenge.rules} />}
        />
        <Route
          path="/challenges/:id/leaderboard"
          component={ChallengeLeaderBoard}
        />
        <Route
          path="/challenges/:challengeId/users/:userId"
          render={(props: any) => (
            <ChallengeUserDashBoard
              challengeTitle={challenge.title}
              webhookURL={challenge.webhookURL}
              openedAt={challenge.openedAt}
              closedAt={challenge.closedAt}
              hashtag={challenge.hashtag}
              {...props}
            />
          )}
        />
      </Switch>
    </ChallengeContent>
  );
};

export default ChallengeBody;

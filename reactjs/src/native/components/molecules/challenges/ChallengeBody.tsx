import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Content } from 'native-base';
import ChallengeOverview from './ChallengeOverview';

const ChallengeBody = (props: any) => {
  const { challenge } = props;

  return (
    <Content padder>
      <Switch>
        <Route
          path="/c/:id/overview"
          render={() => (
            <ChallengeOverview
              text={challenge.overview}
              youtubeId={challenge.youtubeId}
              openedAt={challenge.openedAt.toDate()}
              closedAt={challenge.closedAt.toDate()}
            />
          )}
        />
        {/* <Route
          path="/c/:id/timeline"
          render={() => <ChallengeTimeline channelId={challenge.channelId} />}
        />
        <Route
          path="/c/:collectionId/t/:topicId/edit"
          render={props => <TopicForm collection="challenges" {...props} />}
        />
        <Route
          path="/c/:collectionId/t/new"
          render={props => <TopicForm collection="challenges" {...props} />}
        />
        <Route
          path="/c/:collectionId/t/:topicId"
          render={props => <Topic collection="challenges" {...props} />}
        />
        <Route path="/c/:id/topics" component={ChallengeTopics} />
        <Route
          path="/c/:id/rules"
          render={() => <MarkdownView text={challenge.rules} />}
        />
        <Route path="/c/:id/leaderboard" component={ChallengeLeaderBoard} />
        <Route
          path="/c/:challengeId/u/:userShortId/settings"
          component={ChallengeUserSettings}
        />
        <Route
          path="/c/:challengeId/u/:userId"
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
        /> */}
      </Switch>
    </Content>
  );
};

export default ChallengeBody;

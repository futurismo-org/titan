import React from 'react';
import ChallengeOverview from './ChallengeOverview';
import MarkdownView from '../../atoms/MarkdownView';
import ChallengeLeaderBoard from '~/native/containers/ChallengeLeaderBoardContainer';
import ChallengeUserSettings from '~/native/containers/ChallengeUserSettingsContainer';
import ChallengeUserDashBoard from '~/native/containers/ChallengeUserDashBoardContainer';
import TopicWrapper from '../TopicWrapper';

import { primaryColor } from '~/lib/theme';

const ChallengeBody = (props: any) => {
  const { challenge, isLogin } = props;

  return (
    <React.Fragment>
      {/* <Content padder>
        <Switch>*/}
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
      {/* </Switch>
      </Content> */}
    </React.Fragment>
  );
};

export default ChallengeBody;

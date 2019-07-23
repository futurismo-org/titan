import * as React from 'react';
import { Content, Tabs, ScrollableTab, Tab } from 'native-base';
import ChallengeOverview from './ChallengeOverview';
import MarkdownView from '../../atoms/MarkdownView';
import ChallengeLeaderBoard from './ChallengeLeaderBoard';

const ChallengeTab = (props: any) => {
  const { heading, component } = props;
  return (
    <Tab heading={heading}>
      <Content padder>{component}</Content>
    </Tab>
  );
};

const ChallengeBody = (props: any) => {
  const { challenge } = props;

  return (
    <React.Fragment>
      <Tabs renderTabBar={() => <ScrollableTab />}>
        <ChallengeTab
          heading="概要"
          component={
            <ChallengeOverview
              text={challenge.overview}
              youtubeId={challenge.youtubeId}
              openedAt={challenge.openedAt.toDate()}
              closedAt={challenge.closedAt.toDate()}
            />
          }
        />
        <ChallengeTab
          heading="ルール"
          component={<MarkdownView text={challenge.rules} />}
        />
        {/* タイムラインは一旦保留 */}
        {/* トピックは一旦保留 */}
        <ChallengeTab
          heading="リーダーボード"
          component={<ChallengeLeaderBoard challengeId={challenge.id} />}
        />
        <Tab heading="ダッシュボード">
          <Content padder>
            <ChallengeOverview text={challenge.overview} />
          </Content>
        </Tab>
        <Tab heading="ユーザ設定">
          <Content padder>
            <ChallengeOverview text={challenge.overview} />
          </Content>
        </Tab>
      </Tabs>
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
      {/* </Switch>
      </Content> */}
    </React.Fragment>
  );
};

export default ChallengeBody;

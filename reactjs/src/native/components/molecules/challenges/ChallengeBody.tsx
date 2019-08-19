import React from 'react';
import { Content } from 'native-base';
import { Switch, Route } from 'react-router-native';
import ChallengeOverview from './ChallengeOverview';
import MarkdownView from '../../atoms/MarkdownView';
import ChallengeLeaderBoard from '~/native/containers/ChallengeLeaderBoardContainer';
import ChallengeUserSettings from '~/native/containers/ChallengeUserSettingsContainer';
import ChallengeUserDashBoard from '~/native/containers/ChallengeUserDashBoardContainer';
import TopicForm from '~/native/containers/TopicFormContainer';
import Topic from '~/native/containers/TopicContainer';
import Topics from '~/native/containers/TopicsContainer';
import ChallengeGoals from '~/native/containers/ChallengeGoalsContainer';
import ChallengeJournal from '~/native/containers/ChallengeJournalContainer';

const ChallengeBody = (props: any) => {
  const { challenge } = props;

  return (
    <React.Fragment>
      <Content padder>
        <Switch>
          <Route
            path="/c/:id/overview"
            render={props => (
              <ChallengeOverview
                text={challenge.overview}
                youtubeId={challenge.youtubeId}
                openedAt={challenge.openedAt.toDate()}
                closedAt={challenge.closedAt.toDate()}
                {...props}
              />
            )}
          />
          <Route
            path="/c/:id/rules"
            render={props => <MarkdownView text={challenge.rules} {...props} />}
          />
          <Route
            path="/c/:id/leaderboard"
            render={props => (
              <ChallengeLeaderBoard challengeId={challenge.id} {...props} />
            )}
          />
          <Route
            path="/c/:id/goals"
            render={props => (
              <ChallengeGoals challengeId={challenge.id} {...props} />
            )}
          />
          <Route
            path="/c/:id/u/:userShortId/journal"
            render={props => (
              <ChallengeJournal challengeId={challenge.id} {...props} />
            )}
          />
          <Route
            path="/c/:id/u/:userShortId/settings"
            render={props => (
              <ChallengeUserSettings challenge={challenge} {...props} />
            )}
          />
          <Route
            path="/c/:id/u/:userShortId"
            render={props => (
              <ChallengeUserDashBoard challenge={challenge} {...props} />
            )}
          />
          {/* タイムラインは一旦保留 */}
          {/* <Route
            path="/c/:id/timeline"
            render={() => <ChallengeTimeline channelId={challenge.channelId} />}
          />
          */}
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
          <Route
            path="/c/:collectionId/t/:topicId/edit"
            render={props => <TopicForm collection="challenges" {...props} />}
          />
          <Route
            path="/c/:collectionId/t/new"
            render={props => <TopicForm collection="challenges" {...props} />}
          />
          <Route
            path="/c/:collectionId/topics"
            render={props => (
              <Topics
                collection="challenges"
                collectionId={challenge.id}
                {...props}
              />
            )}
          />
        </Switch>
      </Content>
    </React.Fragment>
  );
};

export default ChallengeBody;

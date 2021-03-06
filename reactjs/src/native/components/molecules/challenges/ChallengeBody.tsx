import React from 'react';
import { Content } from 'native-base';
import { Switch, Route } from 'react-router-native';
import ChallengeOverview from './ChallengeOverview';
import MarkdownView from '../../atoms/MarkdownView';
import ChallengeLeaderBoard from '~/native/containers/challenges/ChallengeLeaderBoardContainer';
import ChallengeUserSettings from '~/native/containers/challenges/ChallengeUserSettingsContainer';
import ChallengeUserDashBoard from '~/native/containers/challenges/ChallengeUserDashBoardContainer';
import TopicForm from '~/native/containers/TopicFormContainer';
import Topic from '~/native/containers/TopicContainer';
import Topics from '~/native/containers/TopicsContainer';
import ChallengeGoals from '~/native/containers/challenges/ChallengeGoalsContainer';
import ChallengeGoal from '~/native/containers/challenges/ChallengeGoalContainer';
import ChallengeObjectiveForm from '~/native/containers/challenges/ChallengeObjectiveFormContainer';
import ChallengeActivities from '~/native/containers/challenges/ChallengeActivitiesContainer';
import ChallengeTimeline from '~/native/containers/challenges/ChallengeTimelineContainer';
import ChallengeActivitiesSuccess from '~/native/containers/challenges/ChallengeActivitiesSuccessContainer';
import ChallengeActivitiesAnalysis from '~/native/containers/challenges/ChallengeActivitiesAnalysisContainer';

import Flag from '~/native/containers/FlagContainer';
import { isiOS } from '~/native/lib/native';

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
                challenge={challenge}
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
            render={props => (
              <React.Fragment>
                <MarkdownView
                  text={
                    isiOS && challenge.ios
                      ? challenge.rulesiOS
                      : challenge.rules
                  }
                  {...props}
                />
                <Flag challenge={challenge} {...props} />
              </React.Fragment>
            )}
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
            path="/c/:id/timeline"
            render={props => (
              <ChallengeTimeline challenge={challenge} {...props} />
            )}
          />
          p
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
            path="/c/:id/topics"
            render={props => (
              <Topics
                collection="challenges"
                collectionId={challenge.id}
                {...props}
              />
            )}
          />
          <Route
            path="/c/:id/u/:userShortId/goal/edit"
            render={props => (
              <ChallengeObjectiveForm challenge={challenge} {...props} />
            )}
          />
          <Route
            path="/c/:id/u/:userShortId/goal"
            render={props => <ChallengeGoal challenge={challenge} {...props} />}
          />
          <Route
            path="/c/:id/u/:userShortId/settings"
            render={props => (
              <ChallengeUserSettings challenge={challenge} {...props} />
            )}
          />
          <Switch>
            <Route
              path="/c/:id/u/:userShortId/activities/success"
              render={props => (
                <ChallengeActivitiesSuccess challenge={challenge} {...props} />
              )}
            />
            <Route
              path="/c/:id/u/:userShortId/activities/analysis"
              render={props => (
                <ChallengeActivitiesAnalysis challenge={challenge} {...props} />
              )}
            />
            <Route
              path="/c/:id/u/:userShortId/activities"
              render={props => (
                <ChallengeActivities challenge={challenge} {...props} />
              )}
            />
            <Route
              path="/c/:id/u/:userShortId"
              render={props => (
                <ChallengeUserDashBoard challenge={challenge} {...props} />
              )}
            />
          </Switch>
        </Switch>
      </Content>
    </React.Fragment>
  );
};

export default ChallengeBody;

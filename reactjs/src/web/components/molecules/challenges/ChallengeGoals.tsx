import React from 'react';
import StackGrid from 'react-stack-grid';
import { Grid } from '@material-ui/core';
import { isEmpty } from 'react-redux-firebase';
import ChallengeGoalCard from '../../atoms/challenges/ChallengeGoalCard';
import Progress from '../../atoms/CircularProgress';
import Title from '../../atoms/Title';
import UserAvatar from '../../atoms/UserAvatar';
import { getChallengeUserGoalPath } from '~/lib/url';

const ChallengeGoals = (props: any) => {
  const { isLoaded, challengeId, goals, notSetGoals } = props;

  return (
    <React.Fragment>
      {!isLoaded ? <Progress /> : null}
      {isLoaded && isEmpty(goals) && <p>目標をまだだれも設定していません。</p>}
      {isLoaded && !isEmpty(goals) && (
        <React.Fragment>
          <div style={{ marginLeft: 10, marginTop: 20, marginBottom: 20 }}>
            <Title text="仲間たちのチャレンジ目標" />
          </div>
          <StackGrid columnWidth={300}>
            {goals.map((goal: any) => (
              <ChallengeGoalCard
                goal={goal}
                key={goal.id}
                challengeId={challengeId}
              />
            ))}
          </StackGrid>
        </React.Fragment>
      )}
      <br />
      {isLoaded && !isEmpty(notSetGoals) && (
        <React.Fragment>
          <h3>目標をまだ設定していないユーザ</h3>
          <Grid container>
            {notSetGoals.map((user: any) => {
              return (
                <Grid item key={user.id}>
                  <UserAvatar
                    photoURL={user.photoURL}
                    userId={user.id}
                    to={getChallengeUserGoalPath(challengeId, user.id)}
                  />
                </Grid>
              );
            })}
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ChallengeGoals;

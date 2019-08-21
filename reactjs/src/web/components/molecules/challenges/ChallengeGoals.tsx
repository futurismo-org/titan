import React, { useEffect } from 'react';
import StackGrid from 'react-stack-grid';
import { Grid } from '@material-ui/core';
import ChallengeGoalCard from '../../atoms/challenges/ChallengeGoalCard';
import Error from '../../atoms/Error';
import Progress from '../../atoms/CircularProgress';
import Title from '../../atoms/Title';
import UserAvatar from '../../atoms/UserAvatar';

const ChallengeGoals = (props: any) => {
  const {
    fetchParticipants,
    resourceId,
    users,
    loading,
    error,
    challengeId,
    goals,
    notSetGoals,
    fetchChallengeObjectives
  } = props;

  useEffect(() => {
    !users && fetchParticipants(resourceId);
    !!users && !goals && fetchChallengeObjectives(users, challengeId);
  }, [
    challengeId,
    fetchChallengeObjectives,
    fetchParticipants,
    goals,
    resourceId,
    users
  ]);

  return (
    <React.Fragment>
      <div style={{ marginLeft: 10, marginTop: 20, marginBottom: 20 }}>
        <Title text="仲間たちのチャレンジ目標" />
      </div>
      {error && <Error error={error} />}
      {loading && <Progress />}
      {!loading && !!goals && (
        <StackGrid columnWidth={300}>
          {goals.map((goal: any) => (
            <ChallengeGoalCard
              goal={goal}
              key={goal.id}
              challengeId={challengeId}
            />
          ))}
        </StackGrid>
      )}
      <br />
      <h3>目標をまだ設定していないユーザ</h3>
      <Grid container>
        {!loading &&
          !!notSetGoals &&
          notSetGoals.map((user: any) => {
            return (
              <Grid item key={user.id}>
                <UserAvatar
                  photoURL={user.photoURL}
                  userId={user.id}
                  to={`/c/${challengeId}/u/${user.id}/note`}
                />
              </Grid>
            );
          })}
      </Grid>
    </React.Fragment>
  );
};

export default ChallengeGoals;

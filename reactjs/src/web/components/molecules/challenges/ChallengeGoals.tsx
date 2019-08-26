import React, { useEffect, useState } from 'react';
import StackGrid from 'react-stack-grid';
import { Grid } from '@material-ui/core';
import ChallengeGoalCard from '../../atoms/challenges/ChallengeGoalCard';
import Title from '../../atoms/Title';
import UserAvatar from '../../atoms/UserAvatar';
import { getChallengeUserGoalPath } from '~/lib/url';
import Progress from '../../atoms/CircularProgress';

const ChallengeGoals = (props: any) => {
  const { fetchGoals, challengeId } = props;

  const [goals, setGoals] = useState([]);
  const [notSetGoals, setNotSetGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetchGoals()
      .then(async (props: any) => {
        const { goals, users } = props;
        setGoals(goals);

        const goalIds = goals.map((goal: any) => goal.id);
        const notSetGoals = users.filter(
          (user: any) => !goalIds.includes(user.id)
        );
        setNotSetGoals(notSetGoals);
      })
      .then(() => setLoading(false));
  }, [fetchGoals]);

  return (
    <React.Fragment>
      {loading && <Progress />}
      {!loading && goals.length === 0 && (
        <p>目標をまだだれも設定していません。</p>
      )}
      {!loading && goals.length !== 0 && (
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
      {notSetGoals !== [] && (
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

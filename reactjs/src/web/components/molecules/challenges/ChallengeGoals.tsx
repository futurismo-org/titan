import React, { useEffect, useState } from 'react';
import StackGrid from 'react-stack-grid';
import ChallengeGoalCard from '../../atoms/challenges/ChallengeGoalCard';
import Title from '../../atoms/Title';
import Progress from '../../atoms/CircularProgress';

const ChallengeGoals = (props: any) => {
  const { feedGoals, challengeId } = props;

  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    feedGoals()
      .then((goals: any) => setGoals(goals))
      .then(() => setLoading(false));
  }, [feedGoals]);

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
    </React.Fragment>
  );
};

export default ChallengeGoals;

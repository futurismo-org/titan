import React, { useState, useEffect } from 'react';
import { Text, Content } from 'native-base';
import Title from '../../atoms/Title';

import Progress from '../../atoms/CircularProgress';
import ChallengeGoalCard from '../../atoms/challenges/ChallengeGoalCard';

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
      <Content padder>
        {loading && <Progress />}
        {!loading && goals.length === 0 && (
          <Text>目標をまだだれも設定していません。</Text>
        )}
        {!loading && goals.length !== 0 && (
          <React.Fragment>
            <Title text="仲間たちのチャレンジ目標" />
            {goals.length !== 0 ? (
              <React.Fragment>
                {goals.map((goal: any) => (
                  <ChallengeGoalCard
                    goal={goal}
                    key={goal.id}
                    challengeId={challengeId}
                  />
                ))}
              </React.Fragment>
            ) : null}
          </React.Fragment>
        )}
      </Content>
    </React.Fragment>
  );
};

export default ChallengeGoals;

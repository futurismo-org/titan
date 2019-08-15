import React, { useState, useEffect } from 'react';
import { View, Text } from 'native-base';

const TotalScoreBoard = (props: any) => {
  const { fetchTotalScore } = props;

  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    let mounted = true;

    const getTotalScore = async () => {
      const score = await fetchTotalScore();

      if (mounted) {
        setTotalScore(score);
      }
    };

    getTotalScore();

    return () => {
      mounted = false;
    };
  }, [fetchTotalScore]);

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 80 }}>{totalScore}</Text>
      <Text style={{ fontSize: 20 }}>score</Text>
    </View>
  );
};

export default TotalScoreBoard;

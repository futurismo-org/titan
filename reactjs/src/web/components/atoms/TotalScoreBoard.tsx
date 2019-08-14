import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';

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
    <div style={{ justifyContent: 'center' }}>
      <Typography variant="h1" component="h2">
        {totalScore}
      </Typography>
      <Typography variant="h5" component="p">
        {'score'}
      </Typography>
    </div>
  );
};

export default TotalScoreBoard;

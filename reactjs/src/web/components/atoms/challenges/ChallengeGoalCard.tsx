import React from 'react';
import { CardContent, Typography, Card } from '@material-ui/core';

const ChallengeGoalCard = (props: any) => {
  const { user } = props;

  return (
    <Card>
      <CardContent>
        <Typography component="p" variant="caption">
          tsu-nera
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ChallengeGoalCard;

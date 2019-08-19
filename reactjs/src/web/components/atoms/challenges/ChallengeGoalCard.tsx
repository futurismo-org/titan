import React from 'react';
import { Card, CardHeader } from '@material-ui/core';
import UserAvatar from '../UserAvatar';
import { formatDateShort } from '~/lib/moment';

const ChallengeGoalCard = (props: any) => {
  const { user } = props;
  return (
    <Card>
      <CardHeader
        avatar={<UserAvatar photoURL={user.photoURL} userId={user.id} />}
        title={user.displayName}
        subheader={`${user.days}days, Joined at ${formatDateShort(
          user.startedAt && user.startedAt.toDate()
        )}`}
      />
    </Card>
  );
};

export default ChallengeGoalCard;

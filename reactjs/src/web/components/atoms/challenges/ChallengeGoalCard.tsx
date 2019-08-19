import React from 'react';
import { Card, CardHeader } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import UserAvatar from '../UserAvatar';
import { formatDateShort } from '~/lib/moment';

const ChallengeGoalCard = (props: any) => {
  const { user, history, challengeId } = props;
  const path = `/c/${challengeId}/u/${user.id}`;
  return (
    <Card onClick={() => history.push(path)}>
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

export default withRouter(ChallengeGoalCard);

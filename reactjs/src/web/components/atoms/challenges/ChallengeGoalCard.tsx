import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography
} from '@material-ui/core';
import UserAvatar from '../UserAvatar';
import { formatDateShort } from '~/lib/moment';
import { getRandomImageURL } from '~/lib/url';
import NoStyledLink from '../NoStyledLink';

const ChallengeGoalCard = (props: any) => {
  const { goal, challengeId } = props;
  const path = `/c/${challengeId}/u/${goal.id}/note`;

  return (
    <Card>
      <CardHeader
        avatar={<UserAvatar photoURL={goal.photoURL} goalId={goal.id} />}
        title={goal.displayName}
        subheader={`${goal.days}days, Joined at ${formatDateShort(
          goal.startedAt && goal.startedAt.toDate()
        )}`}
      />
      <NoStyledLink to={path}>
        <CardMedia
          image={getRandomImageURL()}
          style={{ height: 0, paddingTop: '56.25%' }}
        />
        <CardContent>
          <Typography variant="body2" component="p">
            {goal.what === '' ? '目標未設定' : goal.what}
          </Typography>
        </CardContent>
      </NoStyledLink>
    </Card>
  );
};

export default ChallengeGoalCard;
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
import { getRandomImageURL, getChallengeUserGoalPath } from '~/lib/url';
import NoStyledLink from '../NoStyledLink';

const ChallengeGoalCard = (props: any) => {
  const { goal, challengeId } = props;
  const path = getChallengeUserGoalPath(challengeId, goal.id);

  return (
    <Card>
      <CardHeader
        avatar={<UserAvatar photoURL={goal.photoURL} userId={goal.id} />}
        title={goal.displayName}
        subheader={`Joined at ${formatDateShort(goal.createdAt)}`}
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

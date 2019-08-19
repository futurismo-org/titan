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
  const { user, challengeId } = props;
  const path = `/c/${challengeId}/u/${user.id}`; // TODO journalへのリンクに変更する

  return (
    <Card>
      <CardHeader
        avatar={<UserAvatar photoURL={user.photoURL} userId={user.id} />}
        title={user.displayName}
        subheader={`${user.days}days, Joined at ${formatDateShort(
          user.startedAt && user.startedAt.toDate()
        )}`}
      />
      <NoStyledLink to={path}>
        <CardMedia
          image={getRandomImageURL()}
          style={{ height: 0, paddingTop: '56.25%' }}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            30日間自宅で毎日筋トレをします。
          </Typography>
        </CardContent>
      </NoStyledLink>
    </Card>
  );
};

export default ChallengeGoalCard;

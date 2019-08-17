import * as React from 'react';

import { List, ListItem, Left, Badge, Right, Text, Body } from 'native-base';
import { withRouter } from 'react-router-native';
import { formatYearDate } from '~/lib/moment';
import { brandWhite } from '~/lib/theme';
import { getUserDashboardPath } from '~/lib/url';

const ChallengeItem = withRouter((props: any) => {
  const { challenge, history, userShortId } = props;
  const { title, totalDuration, resetCount, percentage, closedAt } = challenge;

  const path = getUserDashboardPath(challenge.id, userShortId);

  return (
    <ListItem avatar button onPress={() => history.push(path)}>
      <Left>
        <Badge>
          <Text note style={{ color: brandWhite }}>
            {percentage}%
          </Text>
        </Badge>
      </Left>
      <Body>
        <Text>{title}</Text>
        <Text note>{formatYearDate(closedAt)}</Text>
      </Body>
      <Right style={{ justifyContent: 'center' }}>
        <Text note>記録: {totalDuration}回</Text>
        <Text note>リセット: {resetCount}回</Text>
      </Right>
    </ListItem>
  );
});

const ProfileCategoryChallenges = (props: any) => {
  const { challenges, userShortId } = props;

  return (
    <React.Fragment>
      <List>
        {challenges.map((challenge: any) => {
          return (
            <ChallengeItem
              challenge={challenge}
              key={challenge.id}
              userShortId={userShortId}
            />
          );
        })}
      </List>
    </React.Fragment>
  );
};

export default ProfileCategoryChallenges;

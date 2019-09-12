import * as React from 'react';

import { List, ListItem, Left, Badge, Right, Text, Body } from 'native-base';
import { withRouter } from 'react-router-native';
import { formatYearDate } from '~/lib/moment';
import { brandWhite } from '~/lib/theme';
import { getChallengeDashboardPath } from '~/lib/url';
import { CATEGORY_KIND_BAD, CATEGORY_KIND_GOOD } from '~/lib/category';

const ChallengeItem = withRouter((props: any) => {
  const { challenge, history, userShortId, kind } = props;
  const {
    title,
    totalDuration,
    resetCount,
    percentage,
    closedAt,
    totalCount
  } = challenge;

  const path = getChallengeDashboardPath(challenge.id, userShortId);

  return (
    <ListItem avatar button onPress={() => history.push(path)}>
      {kind === CATEGORY_KIND_BAD && (
        <Left>
          <Badge>
            <Text note style={{ color: brandWhite }}>
              {percentage}%
            </Text>
          </Badge>
        </Left>
      )}
      <Body>
        <Text>{title}</Text>
        <Text note>{formatYearDate(closedAt)}</Text>
      </Body>
      <Right style={{ justifyContent: 'center' }}>
        <Text note>記録: {totalDuration}回</Text>
        {kind === CATEGORY_KIND_BAD && (
          <Text note>リセット: {resetCount}回</Text>
        )}
        {kind === CATEGORY_KIND_GOOD && (
          <Text note>ログ数: {totalCount}回</Text>
        )}
      </Right>
    </ListItem>
  );
});

const ProfileCategoryChallenges = (props: any) => {
  const { challenges, userShortId, categoryKind } = props;

  return (
    <React.Fragment>
      <List>
        {challenges.map((challenge: any) => {
          return (
            <ChallengeItem
              challenge={challenge}
              key={challenge.id}
              userShortId={userShortId}
              kind={categoryKind}
            />
          );
        })}
      </List>
    </React.Fragment>
  );
};

export default ProfileCategoryChallenges;

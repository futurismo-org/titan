import React from 'react';

import { withRouter } from 'react-router-native';
import { Body, List, ListItem, Text, Left, Right, Badge } from 'native-base';
import { formatYearDate } from '~/lib/moment';

const ChallengeItem = withRouter((props: any) => {
  const { challenge, history, userShortId } = props;

  return (
    <ListItem
      avatar
      button
      onPress={() => history.replace(`/c/${challenge.id}/u/${userShortId}`)}
    >
      <Left style={{ justifyContent: 'center' }}>
        <Badge>
          <Text>{challenge.rank}位</Text>
        </Badge>
      </Left>
      <Body>
        <Text>{challenge.title}</Text>
        <Text note>{formatYearDate(challenge.closedAt.toDate())}</Text>
      </Body>
      <Right style={{ justifyContent: 'center' }}>
        <Text note>{challenge.score} score</Text>
        <Text note>{challenge.ratio}%</Text>
      </Right>
    </ListItem>
  );
});

const ProfileChallenges = (props: any) => {
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

export default ProfileChallenges;

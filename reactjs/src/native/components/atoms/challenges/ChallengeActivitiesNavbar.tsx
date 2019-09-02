import React from 'react';
import { View, Button } from 'native-base';
import { withRouter } from 'react-router-native';
import TouchableText from '../TouchableText';

const ChallengeActivitiesNavbar = (props: any) => {
  const { challengeId, userShortId, history } = props;
  const basePath = `/c/${challengeId}/u/${userShortId}/activities`;

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10,
        alignSelf: 'center'
      }}
    >
      <Button
        bordered
        warning
        style={{
          width: 100,
          justifyContent: 'center'
        }}
      >
        <TouchableText text="努力日記" path={basePath} />
      </Button>
      <Button
        bordered
        warning
        style={{ width: 100, marginLeft: 5, justifyContent: 'center' }}
      >
        <TouchableText text="達成日記" path={basePath + '/success'} />
      </Button>
      <Button
        bordered
        warning
        style={{ width: 100, marginLeft: 5, justifyContent: 'center' }}
      >
        <TouchableText text="分析日記" path={basePath + '/analysis'} />
      </Button>
    </View>
  );
};

export default withRouter(ChallengeActivitiesNavbar);

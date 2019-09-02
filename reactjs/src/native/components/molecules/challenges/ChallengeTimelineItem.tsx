import React from 'react';
import { Activity, updateStyle } from 'expo-activity-feed';
import { View } from 'native-base';
import { withRouter } from 'react-router-native';
import moment from '~/lib/moment';
import { createPost } from '~/lib/post';

updateStyle('userBar', {
  username: {
    lineHeight: 24
  }
});

const ChallengeTimelineItem = (props: any) => {
  const { history } = props;

  const data = createPost(props.activity).data;

  const activity = {
    actor: {
      data: {
        name: `${data.userName}さんが
${data.message}`,
        profileImage: data.userPhotoURL
      }
    },
    object: data.text,
    verb: data.type,
    time: moment(data.timestamp).toDate()
  };
  const path = data.path;
  const avatarPath = data.avatarPath;

  return (
    <View style={{ margin: 10 }}>
      <Activity
        activity={activity}
        onPressAvatar={() => avatarPath && history.push(avatarPath)}
        onPress={() => path && history.push(path)}
      />
    </View>
  );
};

export default withRouter(ChallengeTimelineItem);

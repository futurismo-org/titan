import React from 'react';
import { Activity, updateStyle } from 'expo-activity-feed';
import { View } from 'native-base';
import { withRouter } from 'react-router-native';
import moment from '~/lib/moment';
import { createPost } from '~/lib/post';
import {
  POST_TYPE_SUCCESS,
  POST_TYPE_ANALYSIS,
  POST_TYPE_NOTE,
  POST_TYPE_OBJECTIVE,
  POST_TYPE_TOPIC
} from '~/constants/post';
import MarkdownView from '../../atoms/MarkdownView';

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

  const hasContent = (type: string) =>
    type === POST_TYPE_SUCCESS ||
    type === POST_TYPE_ANALYSIS ||
    type === POST_TYPE_NOTE ||
    type === POST_TYPE_OBJECTIVE ||
    type === POST_TYPE_TOPIC;

  return (
    <View style={{ marginLeft: 10, marginRight: 10 }}>
      <Activity
        activity={activity}
        onPressAvatar={() => avatarPath && history.push(avatarPath)}
        onPress={() => path && history.push(path)}
        Content={() =>
          hasContent(data.type) ? (
            <View style={{ marginLeft: 20 }}>
              <MarkdownView text={data.text} />
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default withRouter(ChallengeTimelineItem);

import React from 'react';
import { withRouter } from 'react-router-native';
import { Activity, updateStyle } from 'expo-activity-feed';
import { View } from 'native-base';
import { createPost, dummyImage } from '~/lib/post';
import moment from '~/lib/moment';
import {
  POST_TYPE_OPEN,
  POST_TYPE_CLOSE,
  POST_MESSAGE_OPEN,
  POST_MESSAGE_CLOSE
} from '~/constants/post';
import { secondaryColor, brandWhite, brandGray } from '~/lib/theme';
import { isChallengeOpened, isChallengeClosed } from '~/lib/challenge';
import TouchableText from '../TouchableText';

const style = updateStyle('userBar', {
  username: {
    fontSize: 14
  }
});

const ActivityFooter = (props: any) => {
  const isLogin = true;
  const isMyProfile = true;
  return (
    <React.Fragment>
      {isLogin && isMyProfile && (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableText color={brandGray} text="編集" size={14} />
          <View style={{ marginLeft: 10 }}>
            <TouchableText text="削除" color={brandGray} size={14} />
          </View>
        </View>
      )}
    </React.Fragment>
  );
};

export const ChallengeNoteActivity = withRouter((props: any) => {
  const { history } = props;

  const post = createPost(props.activity);
  const data = post.data;

  const activity = {
    actor: {
      data: {
        name: data.message,
        profileImage: data.dummyImage
      }
    },
    object: data.text,
    verb: data.type,
    time: moment(data.timestamp).toDate()
  };
  const path = data.path;

  return (
    <React.Fragment>
      <Activity
        activity={activity}
        styles={style}
        onPress={() => path && history.push(path)}
        Footer={() => <ActivityFooter />}
      />
    </React.Fragment>
  );
});

export const ChallengeNoteOpenActivity = (props: any) => {
  const { challenge } = props;

  if (!isChallengeOpened(challenge.openedAt.toDate())) {
    return null;
  }

  const activity = {
    actor: {
      data: {
        name: POST_MESSAGE_OPEN,
        profileImage: dummyImage(secondaryColor, brandWhite, 'open')
      }
    },
    verb: POST_TYPE_OPEN,
    time: challenge.openedAt.toDate().toISOString()
  };

  return <Activity activity={activity} styles={style} />;
};

export const ChallengeNoteCloseActivity = (props: any) => {
  const { challenge } = props;

  if (!isChallengeClosed(challenge.closedAt.toDate())) {
    return null;
  }

  const activity = {
    actor: {
      data: {
        name: POST_MESSAGE_CLOSE,
        profileImage: dummyImage(secondaryColor, brandWhite, 'close')
      }
    },
    verb: POST_TYPE_CLOSE,
    time: challenge.closedAt.toDate().toISOString()
  };

  return <Activity activity={activity} styles={style} />;
};

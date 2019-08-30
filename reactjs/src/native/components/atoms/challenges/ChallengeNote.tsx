import React, { useState, useEffect } from 'react';
import { View, Text } from 'native-base';
import {
  StreamApp,
  FlatFeed,
  StatusUpdateForm,
  Activity
} from 'expo-activity-feed';
import UserAvatar from '~/native/components/atoms/UserAvatar';
import { GETSTREAM_KEY, GETSTREAM_APP_ID, getToken } from '~/lib/getstream';
import Progress from '~/native/components/atoms/CircularProgress';

import moment from '~/lib/moment';

const CustomActivity = (props: any) => {
  const {
    text,
    createdAt,
    userDisplayName,
    userPhotoURL,
    verb
  } = props.activity;

  const activity = {
    actor: {
      data: {
        name: userDisplayName,
        profileImage: userPhotoURL
      }
    },
    object: text,
    verb,
    time: moment(createdAt).toDate()
  };
  return <Activity activity={activity} />;
};

const ChallengeNote = (props: any) => {
  const {
    fetchUserWithShortId,
    user,
    timelineId,
    userShortId,
    loading
  } = props;

  const [token, setToken] = useState('');

  useEffect(() => {
    getToken(timelineId).then((res: any) => setToken(res));
    fetchUserWithShortId(userShortId);
  }, [fetchUserWithShortId, timelineId, userShortId]);

  return (
    <React.Fragment>
      {loading && <Progress />}
      {!loading && user && token !== '' && (
        <View
          style={{
            paddingLeft: 25,
            paddingRight: 25
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text
              style={{ fontWeight: 'bold', fontSize: 20 }}
            >{`${user.displayName}さんの努力ノート`}</Text>
            <UserAvatar photoURL={user.photoURL} userId={user.shortId} small />
          </View>
          <Text />
          <StreamApp
            apiKey={GETSTREAM_KEY}
            appId={GETSTREAM_APP_ID}
            token={token}
            userId={timelineId}
            options={{ browser: true }} /* hack */
          >
            <FlatFeed Activity={CustomActivity} />
            {/* <StatusUpdateForm feedGroup="timeline" /> */}
          </StreamApp>
        </View>
      )}
    </React.Fragment>
  );
};

export default ChallengeNote;

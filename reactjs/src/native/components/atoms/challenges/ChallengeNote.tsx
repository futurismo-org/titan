import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'native-base';
import { StreamApp, FlatFeed, StatusUpdateForm } from 'expo-activity-feed';
import UserAvatar from '~/native/components/atoms/UserAvatar';
import { GETSTREAM_KEY, GETSTREAM_APP_ID, getToken } from '~/lib/getstream';
import Progress from '~/native/components/atoms/CircularProgress';
import {
  ChallengeNoteActivity,
  ChallengeNoteOpenActivity,
  ChallengeNoteCloseActivity
} from './ChallengeNoteActivity';
import { POST_TYPE_OPEN, POST_TYPE_CLOSE } from '~/constants/post';
import PostButton from '../PostButton';
import TouchableText from '../TouchableText';

const ChallengeNote = (props: any) => {
  const {
    fetchUserWithShortId,
    user,
    timelineId,
    userShortId,
    loading,
    challenge
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
          <Button full rounded>
            <TouchableText text="ノートを投稿" />
          </Button>
          <Text />
          <StreamApp
            apiKey={GETSTREAM_KEY}
            appId={GETSTREAM_APP_ID}
            token={token}
            userId={timelineId}
            options={{ browser: true }} /* hack */
          >
            <ChallengeNoteCloseActivity challenge={challenge} />
            <FlatFeed Activity={ChallengeNoteActivity} />
            <ChallengeNoteOpenActivity challenge={challenge} />
          </StreamApp>
        </View>
      )}
    </React.Fragment>
  );
};

export default ChallengeNote;

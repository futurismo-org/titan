import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'native-base';
import { StreamApp, FlatFeed } from 'expo-activity-feed';
import Modal from 'react-native-modal';
import UserAvatar from '~/native/components/atoms/UserAvatar';
import { GETSTREAM_KEY, GETSTREAM_APP_ID, getToken } from '~/lib/getstream';
import Progress from '~/native/components/atoms/CircularProgress';
import {
  ChallengeNoteOpenActivity,
  ChallengeNoteCloseActivity
} from './ChallengeNoteActivity';
import ChallengeNoteActivity from '~/native/containers/challenges/ChallengeNoteActivityContainer';

import ChallengeNoteForm from '~/native/containers/challenges/ChallengeNoteFormContainer';

const ChallengeActivities = (props: any) => {
  const {
    fetchUserWithShortId,
    user,
    timelineId,
    userShortId,
    loading,
    challenge,
    isMyProfile
  } = props;

  const [token, setToken] = useState('');
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

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
          {isMyProfile && (
            <React.Fragment>
              <Button full rounded onPress={openModal}>
                <Text>ノートを投稿</Text>
              </Button>
              <Modal isVisible={modal} avoidKeyboard>
                <ChallengeNoteForm
                  closeHandler={closeModal}
                  challenge={challenge}
                  user={user}
                />
              </Modal>
              <Text />
            </React.Fragment>
          )}
          <StreamApp
            apiKey={GETSTREAM_KEY}
            appId={GETSTREAM_APP_ID}
            token={token}
            userId={timelineId}
            options={{ browser: true }} /* hack */
          >
            <ChallengeNoteCloseActivity challenge={challenge} />
            <FlatFeed
              Activity={(props: any) => (
                <ChallengeNoteActivity isMyProfile={isMyProfile} {...props} />
              )}
            />
            <ChallengeNoteOpenActivity challenge={challenge} />
          </StreamApp>
        </View>
      )}
    </React.Fragment>
  );
};

export default ChallengeActivities;

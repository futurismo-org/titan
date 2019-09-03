import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'native-base';
import { StreamApp, FlatFeed } from 'expo-activity-feed';
import Modal from 'react-native-modal';
import UserAvatar from '~/native/components/atoms/UserAvatar';
import { GETSTREAM_KEY, GETSTREAM_APP_ID, getToken } from '~/lib/getstream';
import Progress from '~/native/components/atoms/CircularProgress';
import ChallengeNoteActivity from '~/native/containers/challenges/ChallengeNoteActivityContainer';

import ChallengeNoteForm from '~/native/containers/challenges/ChallengeNoteFormContainer';
import { POST_TYPE_ANALYSIS } from '~/constants/post';
import ChallengeActivitiesNavbar from './ChallengeActivitiesNavbar';
import { brandGray } from '~/lib/theme';

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
        <React.Fragment>
          <ChallengeActivitiesNavbar
            challengeId={challenge.id}
            userShortId={userShortId}
          />
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
              >{`${user.displayName}さんの分析日記`}</Text>
              <UserAvatar
                photoURL={user.photoURL}
                userId={user.shortId}
                small
              />
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
            <Text style={{ fontSize: 14, color: brandGray }}>
              分析日記とは、強い感情や危険な行動をしたときは、いつでも書き留めるようにします。
              湧き上がった思考や感情を残らず書き留めるようにする。飾りなく、率直に書く。
              時間をおいて見直し、自分の考えや感情の新たな視点を得ることを期待します。
              自分を否定してはいけません、自分を責めると意志力が弱まりさらに依存は強まります。
            </Text>
            <StreamApp
              apiKey={GETSTREAM_KEY}
              appId={GETSTREAM_APP_ID}
              token={token}
              userId={timelineId}
              options={{ browser: true }} /* hack */
            >
              <FlatFeed
                notify
                Activity={(props: any) => (
                  <ChallengeNoteActivity
                    isMyProfile={isMyProfile}
                    selected={POST_TYPE_ANALYSIS}
                    {...props}
                  />
                )}
              />
            </StreamApp>
          </View>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ChallengeActivities;

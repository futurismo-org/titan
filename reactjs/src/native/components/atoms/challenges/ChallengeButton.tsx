import React, { useState, useEffect } from 'react';
import { Button, Text } from 'native-base';

import { withRouter } from 'react-router-native';

import { successToast } from '~/native/components/atoms/Toast';
import ChallengePostController from '~/native/containers/ChallengePostControllerContainer';

import Error from '../Error';

const ChallengeButton = (props: any) => {
  const {
    challenge,
    user,
    join,
    loading,
    error,
    resourceId,
    profileCategoryResourceId,
    fetchParticipantJoined,
    fetchProfileCategory,
    history,
    joinHandler,
    redirectPath
  } = props;

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchParticipantJoined(resourceId);
    fetchProfileCategory(profileCategoryResourceId);
  }, [
    resourceId,
    refresh,
    fetchProfileCategory,
    profileCategoryResourceId,
    fetchParticipantJoined
  ]);

  const handleJoin = () => {
    joinHandler()
      .then(() => {
        successToast(redirectPath, history.push, 'チャレンジに参加しました');
      })
      .then(() => setRefresh(!refresh));
  };

  const PostButtonController = (props: any) => (
    <ChallengePostController userShortId={user.shortId} challenge={challenge} />
  );

  const JoinButton = (props: any) => (
    <React.Fragment>
      <Button info style={{ margin: 2 }} onPress={handleJoin}>
        <Text>参加する</Text>
      </Button>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading ? null : join ? <PostButtonController /> : <JoinButton />}
    </React.Fragment>
  );
};

export default withRouter(ChallengeButton);

import React, { useState, useEffect } from 'react';
import { Button, Text } from 'native-base';

import { withRouter } from 'react-router-native';

import { successToast } from '~/native/components/atoms/Toast';
import ChallengePostController from '~/native/containers/challenges/ChallengePostControllerContainer';

import Error from '../Error';

const ChallengeButton = (props: any) => {
  const {
    challenge,
    user,
    join,
    loading,
    error,
    profileCategoryResourceId,
    fetchProfileCategory,
    history,
    joinHandler,
    redirectPath,
    isLogin
  } = props;

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchProfileCategory(profileCategoryResourceId);
  }, [refresh, fetchProfileCategory, profileCategoryResourceId]);

  const handleJoin = () => {
    joinHandler()
      .then(() => {
        successToast(redirectPath, history.replace, 'チャレンジに参加しました');
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
      {loading && null}
      {!loading && join ? (
        <PostButtonController />
      ) : isLogin ? (
        <JoinButton />
      ) : null}
    </React.Fragment>
  );
};

export default withRouter(ChallengeButton);

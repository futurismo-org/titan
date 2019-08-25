import React, { useState, useEffect } from 'react';
import { Button, Text } from 'native-base';

import { withRouter } from 'react-router-native';

import { successToast } from '~/native/components/atoms/Toast';
import ChallengePostController from '~/native/containers/challenges/ChallengePostControllerContainer';

const ChallengeButton = (props: any) => {
  const {
    challenge,
    user,
    join,
    loading,
    history,
    joinHandler,
    redirectPath,
    isLogin
  } = props;

  const handleJoin = () => {
    joinHandler().then(() => {
      successToast(redirectPath, history.replace, 'チャレンジに参加しました');
    });
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

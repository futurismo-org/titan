import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Grid } from '@material-ui/core';
import ChallengeObjective from '~/web/containers/challenges/ChallengeObjectiveContainer';

import Error from '../../atoms/Error';
import UserAvatar from '../../atoms/UserAvatar';

const Wrapper = styled.div`
  margin-top: 20px;
`;

const ChallengeGoal = (props: any) => {
  const {
    challenge,
    user,
    userShortId,
    fetchUserWithShortId,
    isMyProfile,
    loading,
    error
  } = props;

  useEffect(() => {
    fetchUserWithShortId(userShortId);
  }, [fetchUserWithShortId, userShortId]);

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && null}
      {!loading && user && challenge && (
        <Wrapper>
          <Grid
            container
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <h1>{user.displayName}さんの目標ノート</h1>
            <UserAvatar photoURL={user.photoURL} userId={user.shortId} large />
          </Grid>
          <ChallengeObjective
            challenge={challenge}
            user={user}
            isMyProfile={isMyProfile}
          />
        </Wrapper>
      )}
    </React.Fragment>
  );
};

export default ChallengeGoal;

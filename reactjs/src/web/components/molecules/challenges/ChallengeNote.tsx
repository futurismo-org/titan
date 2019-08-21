import React, { useEffect } from 'react';
import styled from 'styled-components';

import ChallengeObjective from './ChallengeObjective';
import ChallengeLog from './ChallengeLog';

import Error from '../../atoms/Error';

const Wrapper = styled.div`
  margin-top: 20px;
`;

const ChallengeNote = (props: any) => {
  const {
    challenge,
    user,
    userShortId,
    fetchUserWithShortId,
    loading,
    error,
    isMyProfile
  } = props;

  useEffect(() => {
    fetchUserWithShortId(userShortId);
  }, [fetchUserWithShortId, userShortId]);

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && null}
      {!loading && user && (
        <Wrapper>
          <div style={{ textAlign: 'center' }}>
            <h1>{user.displayName}さんの努力ノート</h1>
          </div>
          <ChallengeObjective
            challenge={challenge}
            user={user}
            isMyProfile={isMyProfile}
          />
          <ChallengeLog challenge={challenge} />
        </Wrapper>
      )}
    </React.Fragment>
  );
};

export default ChallengeNote;

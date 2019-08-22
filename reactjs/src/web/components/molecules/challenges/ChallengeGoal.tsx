import React, { useEffect } from 'react';
import styled from 'styled-components';

import ChallengeObjective from '~/web/containers/ChallengeObjectiveContainer';
import ChallengeLogs from './ChallengeLogs';

import Error from '../../atoms/Error';

const Wrapper = styled.div`
  margin-top: 20px;
`;

const ChallengeGoal = (props: any) => {
  const {
    challenge,
    user,
    userShortId,
    fetchUserWithShortId,
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
          <div style={{ textAlign: 'center' }}>
            <h1>{user.displayName}さんの努力ノート</h1>
          </div>
          <ChallengeObjective challenge={challenge} user={user} />
          <ChallengeLogs challenge={challenge} user={user} />
        </Wrapper>
      )}
    </React.Fragment>
  );
};

export default ChallengeGoal;

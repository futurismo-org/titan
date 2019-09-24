import React, { useEffect } from 'react';

const ChallengeObjectiveForm = (props: any) => {
  const { userShortId, fetchUserWithShortId } = props;

  useEffect(() => {
    fetchUserWithShortId(userShortId);
  }, [fetchUserWithShortId, userShortId]);

  return (
    <React.Fragment>
      <p>test</p>
    </React.Fragment>
  );
};

export default ChallengeObjectiveForm;

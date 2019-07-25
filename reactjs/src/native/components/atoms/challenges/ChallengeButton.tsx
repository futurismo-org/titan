import React, { useEffect } from 'react';
import { Button, Text } from 'native-base';

const ChallengeButton = (props: any) => {
  const { join, resourceId, fetchParticipants, error, loading } = props;

  useEffect(() => {
    fetchParticipants(resourceId);
  }, [fetchParticipants, resourceId]);

  const PostButton = (props: any) => (
    <React.Fragment>
      <Button success small rounded>
        <Text>記録</Text>
      </Button>
      <Button warning small rounded>
        <Text>リセット</Text>
      </Button>
    </React.Fragment>
  );

  const JoinButton = (props: any) => (
    <React.Fragment>
      <Button info small rounded>
        <Text>参加</Text>
      </Button>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {error && <Text>Error: {error}</Text>}
      {loading && null}
      {!loading ? join ? <PostButton /> : <JoinButton /> : null}
    </React.Fragment>
  );
};

export default ChallengeButton;

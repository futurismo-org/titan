import React from 'react';
import { Button, Text } from 'native-base';

const ChallengeButton = (props: any) => {
  const { challenge, join } = props;

  const PostButton = (props: any) => (
    <React.Fragment>
      <Button success small rounded>
        <Text>記録</Text>
      </Button>
      <Button warning small rounded>
        <Text>リセット</Text>
      </Button>
      {/* <ChallengePosts challenge={challenge} /> */}
    </React.Fragment>
  );

  const JoinButton = (props: any) => (
    <React.Fragment>
      <Button info small rounded>
        <Text>参加</Text>
      </Button>
    </React.Fragment>
  );

  // firebase
  //   .firestore()
  //   .collection('challenges')
  //   .doc(challengeId)
  //   .collection('participants')
  //   .where('id', '==', user.shortId)
  //   .get()
  //   .then((s: any) => setJoin(!s.empty));

  return join ? <PostButton /> : <JoinButton />;
};

export default ChallengeButton;

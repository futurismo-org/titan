import * as React from 'react';
import Navbar from '../molecules/challenges/ChallengeNavbar';
import Header from '../molecules/challenges/ChallengeHeader';
import Body from '../molecules/challenges/ChallengeBody';

import Paper from '../templates/PaperWrapper';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';

const Challenge = (props: any) => {
  const {
    loading,
    error,
    resourceId,
    fetchChallenge,
    challenge,
    join,
    participantResourceId,
    fetchParticipantJoined
  } = props;

  React.useEffect(() => {
    fetchChallenge(resourceId);
    fetchParticipantJoined(participantResourceId);
  }, [
    fetchChallenge,
    fetchParticipantJoined,
    participantResourceId,
    resourceId
  ]);

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {!loading &&
        challenge &&
        (challenge.freezed ? (
          <Paper>
            <Title text="凍結しました" />
            <p>
              このコンテンツは不適切なコンテンツと判断して運営が凍結しました。
            </p>
          </Paper>
        ) : (
          <React.Fragment>
            <Header challenge={challenge} join={join} />
            <Paper>
              <Navbar id={challenge.id} join={join} />
              <Body challenge={challenge} join={join} />
            </Paper>
          </React.Fragment>
        ))}
    </React.Fragment>
  );
};

export default Challenge;

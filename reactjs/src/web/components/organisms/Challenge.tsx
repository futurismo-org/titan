import * as React from 'react';
import Navbar from '../molecules/challenges/ChallengeNavbar';
import Header from '../molecules/challenges/ChallengeHeader';
import Body from '../molecules/challenges/ChallengeBody';

import Paper from '../templates/PaperWrapper';
import Progress from '../atoms/CircularProgress';

const Challenge = (props: any) => {
  const { loading, error, resourceId, fetchChallenge, challenge } = props;

  React.useEffect(() => {
    fetchChallenge(resourceId);
  }, []);

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {challenge && (
        <React.Fragment>
          <Header challenge={challenge} />
          <Paper>
            <Navbar id={challenge.id} />
            <Body challenge={challenge} />
          </Paper>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Challenge;

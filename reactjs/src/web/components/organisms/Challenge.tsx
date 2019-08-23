import React from 'react';
import ChallengeNavbar from '../molecules/challenges/ChallengeNavbar';
import Header from '../molecules/challenges/ChallengeHeader';
import Body from '../molecules/challenges/ChallengeBody';

import Paper from '../templates/PaperWrapper';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';

const Challenge = (props: any) => {
  const { loading, challenge, join, userShortId } = props;

  console.log(challenge, join);

  return (
    <React.Fragment>
      {loading && <Progress />}
      {!loading &&
        !!challenge &&
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
              <ChallengeNavbar
                challenge={challenge}
                userShortId={userShortId}
                join={join}
              />
              <Body challenge={challenge} join={join} />
            </Paper>
          </React.Fragment>
        ))}
    </React.Fragment>
  );
};

export default Challenge;

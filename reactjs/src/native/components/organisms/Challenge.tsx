import * as React from 'react';

import { Text } from 'native-base';
import Header from '../molecules/challenges/ChallengeHeader';
import Body from '../molecules/challenges/ChallengeBody';
import ChallengeNavbar from '../molecules/challenges/ChallengeNavbar';

const Challenge = (props: any) => {
  const { loading, challenge, isLogin, userShortId, join } = props;

  return (
    <React.Fragment>
      {loading && null}
      {!loading &&
        !!challenge &&
        (challenge.freezed ? (
          <Text>
            このコンテンツは不適切なコンテンツと判断して運営が凍結しました。
          </Text>
        ) : (
          <React.Fragment>
            <Header challenge={challenge} isLogin={isLogin} join={join} />
            <ChallengeNavbar
              challenge={challenge}
              userShortId={userShortId}
              join={join}
            />
            <Body challenge={challenge} isLogin={isLogin} join={join} />
          </React.Fragment>
        ))}
    </React.Fragment>
  );
};

export default Challenge;

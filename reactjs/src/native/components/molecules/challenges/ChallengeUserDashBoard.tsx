import * as React from 'react';

// import { Text } from 'native-base';
import TwitterButton from '../../atoms/TwitterButton';

const ChallengeUserDashBoard = (props: any) => {
  const { challenge } = props;
  return (
    <React.Fragment>
      <TwitterButton challenge={challenge} />
    </React.Fragment>
  );
};

export default ChallengeUserDashBoard;

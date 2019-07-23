import * as React from 'react';

import { Text } from 'native-base';
import { formatDatetime } from '~/lib/moment';

const ChallengeSchedule = (props: any) => {
  const { openedAt, closedAt } = props;

  return (
    <React.Fragment>
      <Text>開始日時: {formatDatetime(openedAt)}</Text>
      <Text>終了日時: {formatDatetime(closedAt)}</Text>
    </React.Fragment>
  );
};

export default ChallengeSchedule;

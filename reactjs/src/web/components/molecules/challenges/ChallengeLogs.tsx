import React from 'react';
import { Timeline } from 'vertical-timeline-component-for-react';
import {
  ChallengeLogJoin,
  ChallengeLogOpen,
  ChallengeLogClose
} from '../../atoms/challenges/ChallengeLog';

const ChallengeLog = (props: any) => {
  const { challenge } = props;

  return (
    <React.Fragment>
      <Timeline lineColor="#ddd">
        <ChallengeLogJoin />
        <ChallengeLogOpen openedAt={challenge.openedAt.toDate()} />
        <ChallengeLogClose closedAt={challenge.closedAt.toDate()} />
      </Timeline>
    </React.Fragment>
  );
};

export default ChallengeLog;

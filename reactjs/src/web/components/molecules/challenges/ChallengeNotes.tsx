import React from 'react';
import { Timeline } from 'vertical-timeline-component-for-react';
import {
  ChallengeNoteJoin,
  ChallengeNoteOpen,
  ChallengeNoteClose
} from '../../atoms/challenges/ChallengeNote';

const ChallengeNote = (props: any) => {
  const { challenge } = props;

  return (
    <React.Fragment>
      <Timeline lineColor="#ddd">
        <ChallengeNoteJoin />
        <ChallengeNoteOpen openedAt={challenge.openedAt.toDate()} />
        <ChallengeNoteClose closedAt={challenge.closedAt.toDate()} />
      </Timeline>
    </React.Fragment>
  );
};

export default ChallengeNote;

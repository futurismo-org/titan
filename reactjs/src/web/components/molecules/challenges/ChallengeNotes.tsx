import React, { useEffect } from 'react';
import { Timeline } from 'vertical-timeline-component-for-react';
import {
  ChallengeNoteJoin,
  ChallengeNoteOpen,
  ChallengeNoteClose
} from '../../atoms/challenges/ChallengeNote';

const ChallengeNote = (props: any) => {
  const { challenge, startedAt, fetchParticipant, resourceId } = props;

  useEffect(() => {
    fetchParticipant(resourceId);
  }, [fetchParticipant, resourceId]);

  return (
    <React.Fragment>
      <Timeline lineColor="#ddd">
        <ChallengeNoteJoin startedAt={startedAt} />
        <ChallengeNoteOpen openedAt={challenge.openedAt.toDate()} />
        <ChallengeNoteClose closedAt={challenge.closedAt.toDate()} />
      </Timeline>
    </React.Fragment>
  );
};

export default ChallengeNote;

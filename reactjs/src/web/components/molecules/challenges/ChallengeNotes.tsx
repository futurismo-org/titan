import React, { useEffect } from 'react';
import { Timeline } from 'vertical-timeline-component-for-react';
import ChallengeNote from '../../atoms/challenges/ChallengeNote';

import Error from '../../atoms/Error';

const ChallengeNotes = (props: any) => {
  const { fetchParticipant, resourceId, notes, loading, error } = props;

  useEffect(() => {
    fetchParticipant(resourceId);
  }, [fetchParticipant, resourceId]);

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && null}
      {!loading && notes && (
        <React.Fragment>
          <Timeline lineColor="#ddd">
            {notes.map((note: any) => (
              <ChallengeNote key={note.id} type={note.type} data={note.data} />
            ))}
          </Timeline>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ChallengeNotes;

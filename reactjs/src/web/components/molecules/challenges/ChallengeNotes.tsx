import React, { useEffect } from 'react';
import { Timeline } from 'vertical-timeline-component-for-react';
import ChallengeNote from '../../atoms/challenges/ChallengeNote';

import Error from '../../atoms/Error';

const ChallengeNotes = (props: any) => {
  const {
    fetchParticipant,
    resourceId,
    notes,
    userShortId,
    loading,
    error,
    topicsResourceId,
    fetchUserTopics
  } = props;

  useEffect(() => {
    fetchParticipant(resourceId);
    userShortId && fetchUserTopics(topicsResourceId, userShortId);
  }, [
    fetchParticipant,
    fetchUserTopics,
    resourceId,
    topicsResourceId,
    userShortId
  ]);

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

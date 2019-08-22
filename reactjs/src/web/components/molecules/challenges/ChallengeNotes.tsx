import React, { useEffect } from 'react';
import { Timeline } from 'vertical-timeline-component-for-react';
import { Grid } from '@material-ui/core';
import ChallengeNote from '../../atoms/challenges/ChallengeNote';

import Error from '../../atoms/Error';
import ChallengeNoteForm from './ChallengeNoteForm';

const ChallengeNotes = (props: any) => {
  const {
    fetchParticipant,
    resourceId,
    notes,
    userShortId,
    loading,
    error,
    topicsResourceId,
    fetchUserTopics,
    fetchUserNotes,
    notesResourceId,
    challenge,
    user
  } = props;

  useEffect(() => {
    fetchParticipant(resourceId);
    userShortId && fetchUserTopics(topicsResourceId, userShortId);
    userShortId && fetchUserNotes(notesResourceId, userShortId);
  }, [
    fetchParticipant,
    fetchUserNotes,
    fetchUserTopics,
    notesResourceId,
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
          <Grid container direction="row" alignItems="center" justify="center">
            <ChallengeNoteForm challenge={challenge} user={user} />
          </Grid>
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

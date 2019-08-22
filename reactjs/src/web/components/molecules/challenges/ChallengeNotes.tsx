import React, { useState, useEffect } from 'react';
import { Timeline } from 'vertical-timeline-component-for-react';
import { Grid, ButtonGroup, Button } from '@material-ui/core';
import ChallengeNote from '../../atoms/challenges/ChallengeNote';

import Error from '../../atoms/Error';
import {
  NOTE_TYPE_DEFAULT,
  NOTE_TYPE_SUCCESS,
  NOTE_TYPE_ANALYSIS
} from '~/constants/note';

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
    successList,
    analysisList
  } = props;

  const [type, setType] = useState(NOTE_TYPE_DEFAULT);

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

  const ChallengeNotesNavbar = (props: any) => {
    return (
      <div style={{ width: 320 }}>
        <ButtonGroup fullWidth>
          <Button onClick={() => setType(NOTE_TYPE_DEFAULT)}>努力記録</Button>
          <Button onClick={() => setType(NOTE_TYPE_SUCCESS)}>達成日記</Button>
          <Button onClick={() => setType(NOTE_TYPE_ANALYSIS)}>分析日記</Button>
        </ButtonGroup>
      </div>
    );
  };

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && null}
      {!loading && notes && (
        <React.Fragment>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ marginTop: 40 }}
          >
            <ChallengeNotesNavbar />
            <Timeline lineColor="#ddd">
              {type === NOTE_TYPE_DEFAULT &&
                notes.map((note: any) => (
                  <ChallengeNote
                    key={note.id}
                    type={note.type}
                    data={note.data}
                  />
                ))}
              {type === NOTE_TYPE_SUCCESS &&
                successList.map((note: any) => (
                  <ChallengeNote
                    key={note.id}
                    type={note.type}
                    data={note.data}
                  />
                ))}
              {type === NOTE_TYPE_ANALYSIS &&
                analysisList.map((note: any) => (
                  <ChallengeNote
                    key={note.id}
                    type={note.type}
                    data={note.data}
                  />
                ))}
            </Timeline>
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ChallengeNotes;

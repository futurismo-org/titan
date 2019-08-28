import React, { useState, useEffect } from 'react';
import { Timeline } from 'vertical-timeline-component-for-react';
import { Grid, ButtonGroup, Button } from '@material-ui/core';
import ChallengeNote from '../../atoms/challenges/ChallengeNote';

import Error from '../../atoms/Error';
import {
  POST_TYPE_DEFAULT,
  POST_TYPE_SUCCESS,
  POST_TYPE_ANALYSIS
} from '~/constants/post';
import { timelineBorderColor } from '~/lib/theme';

const POST_TYPE_STREAM = 'STREAM';

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
    analysisList,
    isMyProfile,
    feedNotes
  } = props;

  const [type, setType] = useState(POST_TYPE_STREAM);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    // fetchParticipant(resourceId);
    // userShortId && fetchUserTopics(topicsResourceId, userShortId);
    // userShortId && fetchUserNotes(notesResourceId, userShortId);
    feedNotes();
  }, [feedNotes]);

  const ChallengeNotesNavbar = (props: any) => {
    return (
      <div style={{ width: 320 }}>
        <ButtonGroup fullWidth>
          <Button onClick={() => setType(POST_TYPE_DEFAULT)}>努力記録</Button>
          <Button onClick={() => setType(POST_TYPE_SUCCESS)}>達成日記</Button>
          <Button onClick={() => setType(POST_TYPE_ANALYSIS)}>分析日記</Button>
          <Button onClick={() => setType(POST_TYPE_STREAM)}>Stream</Button>
        </ButtonGroup>
      </div>
    );
  };

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && null}
      {!loading && feed && (
        <React.Fragment>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ marginTop: 40 }}
          >
            <ChallengeNotesNavbar />
            <Timeline lineColor={timelineBorderColor}>
              {type === POST_TYPE_DEFAULT &&
                notes.map((note: any) => (
                  <ChallengeNote
                    key={note.id}
                    type={note.type}
                    data={note.data}
                    isMyProfile={isMyProfile(userShortId)}
                  />
                ))}
              {type === POST_TYPE_SUCCESS &&
                successList.map((note: any) => (
                  <ChallengeNote
                    key={note.id}
                    type={note.type}
                    data={note.data}
                    isMyProfile={isMyProfile(userShortId)}
                  />
                ))}
              {type === POST_TYPE_ANALYSIS &&
                analysisList.map((note: any) => (
                  <ChallengeNote
                    key={note.id}
                    type={note.type}
                    data={note.data}
                    isMyProfile={isMyProfile(userShortId)}
                  />
                ))}
              {type === POST_TYPE_STREAM &&
                feed &&
                feed.map((note: any) => (
                  <ChallengeNote
                    key={note.id}
                    type={note.type}
                    data={note.data}
                    isMyProfile={isMyProfile(userShortId)}
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

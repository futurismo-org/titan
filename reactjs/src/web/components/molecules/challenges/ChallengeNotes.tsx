import React, { useState, useEffect } from 'react';
import { Timeline } from 'vertical-timeline-component-for-react';
import { Grid, ButtonGroup, Button } from '@material-ui/core';
import ChallengeNote from '../../atoms/challenges/ChallengeNote';

import {
  POST_TYPE_NOTE,
  POST_TYPE_SUCCESS,
  POST_TYPE_ANALYSIS
} from '~/constants/post';
import { timelineBorderColor } from '~/lib/theme';

const ChallengeNotes = (props: any) => {
  const { isMyProfile, feedNotes, userId } = props;

  const [type, setType] = useState(POST_TYPE_NOTE);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (posts.length === 0 && !loading) {
      setLoading(true);
      feedNotes().then((notes: any) => {
        setPosts(notes);
        setLoading(false);
      });
    }
  }, [feedNotes, loading, posts, posts.length]);

  const ChallengeNotesNavbar = (props: any) => {
    return (
      <div style={{ width: 320 }}>
        <ButtonGroup fullWidth>
          <Button onClick={() => setType(POST_TYPE_NOTE)}>努力記録</Button>
          <Button onClick={() => setType(POST_TYPE_SUCCESS)}>達成日記</Button>
          <Button onClick={() => setType(POST_TYPE_ANALYSIS)}>分析日記</Button>
        </ButtonGroup>
      </div>
    );
  };

  return (
    <React.Fragment>
      {posts.length !== 0 && (
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
              {type === POST_TYPE_NOTE &&
                posts.map((post: any) => (
                  <ChallengeNote
                    key={post.id}
                    type={post.type}
                    data={post.data}
                    isMyProfile={isMyProfile}
                    userId={userId}
                  />
                ))}
              {/* {type === POST_TYPE_SUCCESS &&
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
                ))} */}
            </Timeline>
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ChallengeNotes;

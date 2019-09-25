import React, { useState, useEffect } from 'react';
import { Timeline } from 'vertical-timeline-component-for-react';
import { Grid, ButtonGroup, Button } from '@material-ui/core';
import ChallengeNote from '~/web/containers/challenges/ChallengeNoteActivityContainer';

import {
  POST_TYPE_NOTE,
  POST_TYPE_SUCCESS,
  POST_TYPE_ANALYSIS
} from '~/constants/post';
import { timelineBorderColor } from '~/lib/theme';

const ChallengeNotes = (props: any) => {
  const { isMyProfile, feedNotes } = props;

  const [type, setType] = useState(POST_TYPE_NOTE);
  const [posts, setPosts] = useState([]);
  const [successList, setSuccessList] = useState([]);
  const [analysisList, setAnalysisList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (posts.length === 0 && !loading) {
      setLoading(true);
      feedNotes().then((notes: any) => {
        setPosts(notes);
        setSuccessList(
          notes.filter((note: any) => note.type === POST_TYPE_SUCCESS)
        );
        setAnalysisList(
          notes.filter((note: any) => note.type === POST_TYPE_ANALYSIS)
        );
        setLoading(false);
      });
    }
  }, [feedNotes, loading, posts, posts.length]);

  const ChallengeNotesNavbar = (props: any) => {
    return (
      <div style={{ width: 320 }}>
        <ButtonGroup fullWidth>
          <Button onClick={() => setType(POST_TYPE_NOTE)}>行動日記</Button>
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
            {type === POST_TYPE_SUCCESS && (
              <div style={{ maxWidth: 600 }}>
                <p>
                  達成日記を書くことで、成功体験を積み重ねている実感が得られます。
                  <br />
                  達成できたことを書きます。できなかったことや失敗は書きません。
                  <br />
                  感謝すること、目標達成に行ったことも書きます。学びや気付きも書きます。
                  <br />
                  読み返すことで自己肯定感が高まります。次の目標や課題もあわせて追記しましょう。
                </p>
              </div>
            )}
            {type === POST_TYPE_ANALYSIS && (
              <p>
                分析日記とは、強い感情や危険な行動をしたときは、いつでも書き留めるようにします。
                <br />
                湧き上がった思考や感情を残らず書き留めるようにする。飾りなく、率直に書く。
                <br />
                時間をおいて見直し、自分の考えや感情の新たな視点を得ることを期待します。
                <br />
                自分を否定してはいけません、自分を責めると意志力が弱まりさらに依存は強まります。
              </p>
            )}
            <Timeline lineColor={timelineBorderColor}>
              {type === POST_TYPE_NOTE &&
                posts.map((post: any) => (
                  <ChallengeNote
                    key={post.id}
                    type={post.type}
                    data={post.data}
                    isMyProfile={isMyProfile}
                  />
                ))}
              {type === POST_TYPE_SUCCESS &&
                successList.map((note: any) => (
                  <ChallengeNote
                    key={note.id}
                    type={note.type}
                    data={note.data}
                    isMyProfile={isMyProfile}
                  />
                ))}
              {type === POST_TYPE_ANALYSIS &&
                analysisList.map((note: any) => (
                  <ChallengeNote
                    key={note.id}
                    type={note.type}
                    data={note.data}
                    isMyProfile={isMyProfile}
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

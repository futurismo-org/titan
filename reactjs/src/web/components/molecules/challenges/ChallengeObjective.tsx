import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Grid } from '@material-ui/core';
import Title from '../../atoms/Title';

import {
  ChallengeObjectiveWhatCard,
  ChallengeObjectiveWhyCard
} from './ChallengeObjectiveCard';

const ChallengeObjectiveDescription = (props: any) => {
  const { challenge } = props;
  const challengeId = challenge.id;

  return (
    <ul>
      <li>{challenge.title}を通じて達成したいことを書きます。</li>
      <li>
        定量的(計測可能、数値)目標、自分でコントロール可能な目標を記入してください。
      </li>
      <li>
        ここに書いたことは
        <Link to={`/c/${challengeId}/goals`}>ゴールボード</Link>
        でみんなと共有されます。
      </li>
      <li>なにをやるのかの入力欄に一言で目標を書いてください。(60字以内)</li>
      <li>なぜやるのかの入力欄に目標に取り組む理由を詳しく書いてください。</li>
    </ul>
  );
};

const ChallengeObjective = (props: any) => {
  const { challenge } = props;

  const [what, setTitle] = useState(`${challenge.title}に毎日取り組みます！`);
  const [why, setWhy] = useState('');
  const [edit, setEdit] = useState(false);

  const onWhatChange = (e: any) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const onWhyChange = (e: any) => {
    e.preventDefault();
    setWhy(e.target.value);
  };

  const ChallengeObjectiveFormButton = (props: any) => {
    const text = edit ? '保存' : '編集';

    return (
      <Button
        variant="contained"
        style={{ fontWeight: 'bold' }}
        onClick={() => setEdit(!edit)}
      >
        {text}
      </Button>
    );
  };

  return (
    <React.Fragment>
      <Title text="チャレンジ目標" />
      <div style={{ textAlign: 'right' }}>
        <ChallengeObjectiveFormButton />
      </div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>
          {edit ? (
            <React.Fragment>
              <TextField
                value={what}
                variant="outlined"
                margin="normal"
                required
                id="what"
                label="なにをやるのか(What)"
                fullWidth
                onChange={onWhatChange}
              />
              <TextField
                value={why}
                variant="outlined"
                margin="normal"
                id="why"
                label="なぜやるのか(Why)"
                fullWidth
                multiline
                rows={8}
                onChange={onWhyChange}
              />
            </React.Fragment>
          ) : (
            <div>
              <div style={{ marginTop: 20, marginBottom: 20 }}>
                <ChallengeObjectiveWhatCard text={what} />
                {!!why && <ChallengeObjectiveWhyCard text={why} />}
              </div>
            </div>
          )}
        </Grid>
      </Grid>
      {edit ? <ChallengeObjectiveDescription challenge={challenge} /> : null}
    </React.Fragment>
  );
};

export default ChallengeObjective;

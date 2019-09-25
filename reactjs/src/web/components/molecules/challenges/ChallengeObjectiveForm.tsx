import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, Grid, TextField } from '@material-ui/core';

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

const ChallengeObjectiveForm = (props: any) => {
  const {
    userShortId,
    fetchUserWithShortId,
    isLoaded,
    handleSave,
    history,
    redirectPath,
    objective
  } = props;

  const [what, setWhat] = useState('');
  const [why, setWhy] = useState('');

  useEffect(() => {
    fetchUserWithShortId(userShortId);
    if (isLoaded) {
      setWhat(objective ? objective.what : '');
      setWhy(objective ? objective.why : '');
    }
  }, [fetchUserWithShortId, isLoaded, objective, userShortId]);

  const onWhatChange = (e: any) => {
    e.preventDefault();
    setWhat(e.target.value);
  };

  const onWhyChange = (e: any) => {
    e.preventDefault();
    setWhy(e.target.value);
  };

  const ChallengeObjectiveFormButton = (props: any) => {
    const onCancel = () => history.push(redirectPath);
    const onSave = () =>
      handleSave({ what, why, isCreate: !objective }).then(() =>
        history.push(redirectPath)
      );

    return (
      <React.Fragment>
        <Button
          variant="contained"
          onClick={onCancel}
          style={{ marginRight: 5 }}
        >
          キャンセル
        </Button>
        <Button
          variant="contained"
          style={{ fontWeight: 'bold' }}
          onClick={onSave}
        >
          保存
        </Button>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {isLoaded && (
        <React.Fragment>
          <p />
          <div style={{ textAlign: 'right' }}>
            <ChallengeObjectiveFormButton />
          </div>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
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
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default withRouter(ChallengeObjectiveForm);

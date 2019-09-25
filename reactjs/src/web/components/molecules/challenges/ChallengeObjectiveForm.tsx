import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, Grid, TextField } from '@material-ui/core';

const ChallengeObjectiveDescription = (props: any) => {
  const { challengeId } = props;

  return (
    <ul>
      <li>チャレンジを通じて達成したいことを書きます。</li>
      <li>
        定量的(計測可能、数値)目標、自分でコントロール可能な目標を記入してください。
      </li>
      <li>
        目標は
        <Link to={`/c/${challengeId}/goals`}>ゴールボード</Link>
        でみんなと共有されます。
      </li>
    </ul>
  );
};

const ChallengeObjectiveForm = (props: any) => {
  const {
    userShortId,
    challengeId,
    fetchUserWithShortId,
    isLoaded,
    handleSave,
    history,
    redirectPath,
    objective
  } = props;

  const [what, setWhat] = useState('');
  const [why, setWhy] = useState('');
  const [outcome, setOutcome] = useState('');
  const [obstacle, setObstacle] = useState('');
  const [plan, setPlan] = useState('');

  useEffect(() => {
    fetchUserWithShortId(userShortId);
    if (isLoaded) {
      setWhat(objective.what ? objective.what : '');
      setWhy(objective.why ? objective.why : '');
      setOutcome(objective.outcome ? objective.outcome : '');
      setObstacle(objective.obstacle ? objective.obstacle : '');
      setPlan(objective.plan ? objective.plan : '');
    }
  }, [fetchUserWithShortId, isLoaded, objective, userShortId]);

  const onChange = (setter: any) => (e: any) => {
    e.preventDefault();
    setter(e.target.value);
  };

  const onWhatChange = onChange(setWhat);
  const onWhyChange = onChange(setWhy);
  const onOutcomeChange = onChange(setOutcome);
  const onObstacleChange = onChange(setObstacle);
  const onPlanChange = onChange(setPlan);

  const ChallengeObjectiveFormButton = (props: any) => {
    const onCancel = () => history.push(redirectPath);
    const onSave = () =>
      handleSave({
        what,
        why,
        outcome,
        obstacle,
        plan,
        isCreate: !objective
      }).then(() => history.push(redirectPath));

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
              <ChallengeObjectiveDescription challengeId={challengeId} />
              <p>なにをやるのかを一言で入力してください。</p>
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
              <p>
                ここからの入力は、 目標達成のための最新の科学的手法、
                <b>
                  <a href="https://amzn.to/2l5cfA4">WOOP</a>
                </b>
                に従って設計されています。入力は少し大変ですが、WOOPを使うと目標達成率は2倍になります。
              </p>
              <h3>1. 願望(Wish)</h3>
              <p>
                この目標に取り組む理由を書いてください。とくに、強い願望を書いてください。
              </p>
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
              <h3>2. 成果(Outcome)</h3>
              <p>
                この目標に取り組むことで得られるベストな成果を書いてください。
                そして、それを手に入れた自分をできるだけ具体的にイメージしてください。
                イメージを助けるために、理想の人物の名前や参考になる記事、画像へのURLも合わせて入力するとよいです。
              </p>
              <TextField
                value={outcome}
                variant="outlined"
                margin="normal"
                id="outcome"
                label="ベストな成果はなにか？"
                fullWidth
                multiline
                rows={8}
                onChange={onOutcomeChange}
              />
              <h3>3. 障害(Obstacle)</h3>
              <p>
                成果を達成することを妨げる、障害になるものを詳細に書いてください。
                <ul>
                  <li>どんな考え方が目標の達成をさまたげているのか？</li>
                  <li>どんな行動が目標の達成をさまたげているのか？</li>
                  <li>どんな癖や習慣が目標の達成をさまたげているのか？</li>
                  <li>どんな思い込みが目標の達成をさまたげているのか？</li>
                  <li>どんな感情が目標の達成をさまたげているのか？</li>
                </ul>
              </p>
              <TextField
                value={obstacle}
                variant="outlined"
                margin="normal"
                id="obstacle"
                label="障害はなにか？"
                fullWidth
                multiline
                rows={8}
                onChange={onObstacleChange}
              />
              <h3>4. 計画(Planing)</h3>
              <p>
                障害が発生したときの対処方法を、
                <a href="https://amzn.to/2lBHBhU">if-thenプランニング</a>
                という心理学の手法に落とし込みます。目標達成率が３倍になる手法です。
                やり方は、簡単。 <b>「XしたらYする」</b>と決めるだけ。
                Xには、いつ、どこで、というトリガーを書きます。Yには行動を書きます。
              </p>
              <TextField
                value={plan}
                variant="outlined"
                margin="normal"
                id="plan"
                label="if-thenプランニングを列挙"
                fullWidth
                multiline
                rows={8}
                onChange={onPlanChange}
              />
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default withRouter(ChallengeObjectiveForm);

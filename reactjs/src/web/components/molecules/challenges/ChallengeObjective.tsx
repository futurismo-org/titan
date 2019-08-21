import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../../atoms/Title';

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

  return (
    <React.Fragment>
      <Title text="チャレンジ目標" />
      <ChallengeObjectiveDescription challenge={challenge} />
    </React.Fragment>
  );
};

export default ChallengeObjective;

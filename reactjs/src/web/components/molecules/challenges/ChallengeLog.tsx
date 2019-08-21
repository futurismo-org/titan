import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../../atoms/Title';

const ChallengeObjective = (props: any) => {
  const { challenge } = props;

  return (
    <React.Fragment>
      <Title text="チャレンジログ" />
    </React.Fragment>
  );
};

export default ChallengeObjective;

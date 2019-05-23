import React from "react";

const ChallengeHeader = props => {
  const { challenge } = props;

  return (
    <div>
      <h1>{challenge.title}</h1>
      <p>{challenge.discription}</p>
    </div>
  );
};

export default ChallengeHeader;

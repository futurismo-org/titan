import React from "react";

const ChallengeHeader = props => {
  const { challenge } = props;

  return (
    <React.Fragment>
      <h1>{challenge.title}</h1>
      <p>{challenge.discription}</p>
    </React.Fragment>
  );
};

export default ChallengeHeader;

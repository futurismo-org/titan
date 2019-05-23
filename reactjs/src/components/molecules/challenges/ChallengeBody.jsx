import React from "react";
import { Switch, Route } from "react-router-dom";
import ChallengeOverview from "./ChallengeOverview";
import ChallengeDiscussion from "./ChallengeDIscussion";
import ChallengeRules from "./ChallengeRules";
import ChallengeLeaderBoard from "./ChallengeLeaderBoard";

const ChallengeBody = props => {
  const { challenge } = props;

  return (
    <React.Fragment>
      <Switch>
        <Route path="/challenges/:id/overview" component={ChallengeOverview} />
        <Route
          path="/challenges/:id/discussion"
          component={ChallengeDiscussion}
        />
        <Route path="/challenges/:id/rules" component={ChallengeRules} />
        <Route
          path="/challenges/:id/leaderboard"
          component={ChallengeLeaderBoard}
        />
      </Switch>
    </React.Fragment>
  );
};

export default ChallengeBody;

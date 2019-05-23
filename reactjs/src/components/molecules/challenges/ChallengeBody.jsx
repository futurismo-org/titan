import React from "react";
import { Switch, Route } from "react-router-dom";
import { Typography } from "@material-ui/core";
import styled from "styled-components";
import ChallengeOverview from "./ChallengeOverview";
import ChallengeDiscussion from "./ChallengeDIscussion";
import ChallengeRules from "./ChallengeRules";
import ChallengeLeaderBoard from "./ChallengeLeaderBoard";

import theme from "../../../lib/theme";

const ChallengeContent = styled.div`
  padding: ${theme.spacing(2)}px;
`;

const ChallengeBody = () => {
  return (
    <ChallengeContent>
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
    </ChallengeContent>
  );
};

export default ChallengeBody;

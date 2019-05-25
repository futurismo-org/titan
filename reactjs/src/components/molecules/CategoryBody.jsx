import React from "react";
import { Switch, Route } from "react-router-dom";
import CategoryOverview from "./CategoryOverview";
import CategoryDiscussion from "./CategoryDIscussion";
import CategoryRules from "./CategoryRules";
import CategoryLeaderBoard from "./CategoryLeaderBoard";

const CategoryBody = props => {
  const { category } = props;

  return (
    <div>
      <Switch>
        <Route path="/categories/:id/overview" component={CategoryOverview} />
        <Route
          path="/categories/:id/discussion"
          component={CategoryDiscussion}
        />
        <Route path="/categories/:id/rules" component={CategoryRules} />
        <Route
          path="/categories/:id/leaderboard"
          component={CategoryLeaderBoard}
        />
      </Switch>
    </div>
  );
};

export default CategoryBody;

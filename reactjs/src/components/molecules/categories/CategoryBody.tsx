import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import CategoryOverview from './CategoryOverview';
import CategoryDiscussion from './CategoryDiscussion';
import CategoryRules from './CategoryRules';
import CategoryLeaderBoard from './CategoryLeaderBoard';

import theme from '../../../lib/theme';

const CategoryContent = styled.div`
  padding: ${theme.spacing(2)}px;
`;

const CategoryBody = () => {
  return (
    <CategoryContent>
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
    </CategoryContent>
  );
};

export default CategoryBody;

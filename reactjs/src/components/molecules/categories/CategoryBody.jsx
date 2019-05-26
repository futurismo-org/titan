import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import CategoryChallenges from './CategoryChallenges';

import theme from '../../../lib/theme';

const CategoryContent = styled.div`
  padding: ${theme.spacing(2)}px;
`;

const CategoryBody = () => {
  return (
    <CategoryContent>
      <Switch>
        <Route
          path="/categories/:id/challenges"
          component={CategoryChallenges}
        />
      </Switch>
    </CategoryContent>
  );
};

export default CategoryBody;

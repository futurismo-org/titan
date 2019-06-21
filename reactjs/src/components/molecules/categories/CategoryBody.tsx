import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import styled from 'styled-components';
import theme from '../../../lib/theme';

import CategoryDashBoard from './CategoryDashBoard';
import CategoryDiscussion from './CategoryDiscussion';
import DiscussionForm from '../DiscussionForm';

const CategoryContent = styled.div`
  padding: ${theme.spacing(2)}px;
`;

const CategoryBody = (props: any) => {
  const { category } = props;

  return (
    <CategoryContent>
      <Switch>
        <Route
          path="/categories/:id/discussions/new"
          render={() => <DiscussionForm type="category" />}
        />
        <Route
          path="/categories/:id/discussions"
          render={() => <CategoryDiscussion category={category} />}
        />
        <Route
          path="/categories/:id/dashboard"
          render={() => <CategoryDashBoard category={category} />}
        />
      </Switch>
    </CategoryContent>
  );
};

export default CategoryBody;

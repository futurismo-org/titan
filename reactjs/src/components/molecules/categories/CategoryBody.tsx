import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import styled from 'styled-components';
import theme from '../../../lib/theme';

import CategoryDashBoard from './CategoryDashBoard';
import CategoryTopics from './CategoryTopics';
import TopicForm from '../TopicForm';

const CategoryContent = styled.div`
  padding: ${theme.spacing(2)}px;
`;

const CategoryBody = (props: any) => {
  const { category } = props;

  return (
    <CategoryContent>
      <Switch>
        <Route
          path="/categories/:id/topics/new"
          render={() => (
            <TopicForm collection="categories" categoryId={category.id} />
          )}
        />
        <Route
          path="/categories/:id/topics"
          render={() => <CategoryTopics category={category} />}
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

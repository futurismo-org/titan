import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import styled from 'styled-components';
import theme from '../../../lib/theme';

import CategoryDashBoard from './CategoryDashBoard';
import Topic from '../Topic';
import TopicForm from '../TopicForm';
import Topics from '../Topics';

const CategoryContent = styled.div`
  padding: ${theme.spacing(2)}px;
`;

const CategoryBody = (props: any) => {
  const { category } = props;

  return (
    <CategoryContent>
      <Switch>
        <Route
          path="/categories/:collectionId/topics/:topicId/edit"
          render={match => <TopicForm collection="categories" match={match} />}
        />
        <Route
          path="/categories/:collectionId/topics/new"
          render={match => <TopicForm collection="categories" match={match} />}
        />
        <Route
          path="/categories/:collectionId/topics/:topicId"
          render={props => <Topic collection="categories" props={props} />}
        />
        <Route
          path="/categories/:id/topics"
          render={() => (
            <Topics collection="categories" collectionId={category.id} />
          )}
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

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import styled from 'styled-components';
import theme from 'lib/theme';

import CategoryDashBoard from './CategoryDashBoard';
import Topic from '../Topic';
import TopicForm from '../TopicForm';
import Topics from '../Topics';

const CategoryContent = styled.div`
  padding: ${theme.spacing(2)}px;
`;

const CategoryBody = (props: any) => {
  const { category, challenges } = props;

  return (
    <CategoryContent>
      <Switch>
        <Route
          path="/cat/:collectionId/t/:topicId/edit"
          render={props => <TopicForm collection="categories" {...props} />}
        />
        <Route
          path="/cat/:collectionId/t/new"
          render={props => <TopicForm collection="categories" {...props} />}
        />
        <Route
          path="/cat/:collectionId/t/:topicId"
          render={props => <Topic collection="categories" {...props} />}
        />
        <Route
          path="/cat/:id/topics"
          render={() => (
            <Topics collection="categories" collectionId={category.id} />
          )}
        />
        <Route
          path="/cat/:id/dashboard"
          render={() => (
            <CategoryDashBoard category={category} challenges={challenges} />
          )}
        />
      </Switch>
    </CategoryContent>
  );
};

export default CategoryBody;

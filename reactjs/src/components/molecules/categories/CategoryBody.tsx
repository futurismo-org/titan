import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import styled from 'styled-components';
import theme from '../../../lib/theme';

import CategoryDashBoard from './CategoryDashBoard';
import CategoryTopics from './CategoryTopics';
import CategoryTopic from './CategoryTopic';
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
          path="/categories/:categoryId/topics/:topicId/edit"
          render={match => <TopicForm collection="categories" match={match} />}
        />
        <Route
          path="/categories/:categoryId/topics/new"
          render={match => <TopicForm collection="categories" match={match} />}
        />
        <Route
          path="/categories/:categoryId/topics/:topicId"
          render={props => <CategoryTopic props={props} />}
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

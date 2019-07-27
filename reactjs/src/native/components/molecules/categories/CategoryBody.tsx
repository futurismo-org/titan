import * as React from 'react';
import { Content } from 'native-base';
import { Switch, Route } from 'react-router-native';

import CategoryDashBoard from './CategoryDashBoard';
import Topic from '~/native/containers/TopicContainer';
import TopicForm from '~/native/containers/TopicFormContainer';
import Topics from '~/native/containers/TopicsContainer';

const CategoryBody = (props: any) => {
  const { category, topics, topicPath } = props;
  return (
    <Content padder>
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
          render={props => (
            <Topics
              collection="categories"
              collectionId={category.id}
              {...props}
            />
          )}
        />
        <Route
          path="/cat/:id/dashboard"
          render={props => (
            <CategoryDashBoard
              category={category}
              topics={topics}
              topicPath={topicPath}
              {...props}
            />
          )}
        />
      </Switch>
    </Content>
  );
};

export default CategoryBody;

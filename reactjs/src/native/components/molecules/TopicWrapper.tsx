import * as React from 'react';

import { Switch, Route, withRouter } from 'react-router-native';
import TopicForm from '~/native/containers/TopicFormContainer';
import Topic from '~/native/containers/TopicContainer';
import Topics from '~/native/containers/TopicsContainer';

const TopicWrapper = (props: any) => {
  const { collection, collectionId, history } = props;

  history.push(`/c/${collectionId}/topics`);

  return (
    <Switch>
      <Route
        path="/c/:collectionId/t/:topicId/edit"
        render={props => <TopicForm collection={collection} {...props} />}
      />
      <Route
        path="/c/:collectionId/t/new"
        render={props => <TopicForm collection={collection} {...props} />}
      />
      <Route
        path="/c/:collectionId/t/:topicId"
        render={props => <Topic collection={collection} {...props} />}
      />
      <Route
        path="/c/:collectionId/topics"
        render={props => (
          <Topics
            collection={collection}
            collectionId={collectionId}
            {...props}
          />
        )}
      />
    </Switch>
  );
};

export default withRouter(TopicWrapper);

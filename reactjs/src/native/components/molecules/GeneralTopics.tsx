import * as React from 'react';
import { Switch, Route } from 'react-router-native';
import Topics from '../../containers/TopicsContainer';
// import Topic from './Topic';
// import TopicForm from './TopicForm';

const GeneralTopics = (props: any) => {
  return (
    <Switch>
      {/* <Route
        path="/topics/new"
        render={props => <TopicForm collection="general" {...props} />}
      />
      <Route
        path="/topics/:topicId/edit"
        render={props => <TopicForm collection="general" {...props} />}
      />
      <Route
        path="/topics/:topicId"
        render={props => <Topic collection="general" {...props} />}
      /> */}
      <Route
        path="/topics"
        render={props => <Topics collection="general" {...props} />}
      />
    </Switch>
  );
};

export default GeneralTopics;

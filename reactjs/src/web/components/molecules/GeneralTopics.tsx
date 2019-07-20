import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'lib/theme';
import Topics from '../../containers/TopicsContainer';
import Topic from './Topic';
import TopicForm from './TopicForm';

const TopicContent = styled.div`
  padding: ${theme.spacing(2)}px;
`;

const GeneralTopics = (props: any) => {
  return (
    <TopicContent>
      <Switch>
        <Route
          path="/topics/:topicId"
          render={props => <Topic collection="general" {...props} />}
        />
        <Route
          path="/topics/:topicId/edit"
          render={props => <TopicForm collection="general" {...props} />}
        />
        <Route
          path="/topics/new"
          render={props => <TopicForm collection="general" {...props} />}
        />
        <Route
          path="/topics"
          render={props => <Topics collection="general" {...props} />}
        />
      </Switch>
    </TopicContent>
  );
};

export default GeneralTopics;

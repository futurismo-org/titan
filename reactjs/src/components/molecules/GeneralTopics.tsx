import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Topics from './Topics';
import Topic from './Topic';
import TopicForm from './TopicForm';

import theme from '../../lib/theme';

const TopicContent = styled.div`
  padding: ${theme.spacing(2)}px;
`;

const GeneralTopics = (props: any) => {
  return (
    <TopicContent>
      <Switch>
        <Route
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

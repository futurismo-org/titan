import * as React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import PostButton from '../atoms/PostButton';
import Title from '../atoms/Title';

import TopicList from './TopicList';
import Progress from '../atoms/CircularProgress';

const Topics = (props: any) => {
  const {
    topics,
    loading,
    error,
    resourceId,
    postButtonPath,
    fetchTopics
  } = props;

  React.useEffect(() => {
    fetchTopics(resourceId);
  }, [fetchTopics, resourceId]);

  return (
    <React.Fragment>
      <ListItem>
        <ListItemText>
          <Title text="トピック" />
        </ListItemText>
        <PostButton to={postButtonPath} type="button" />
      </ListItem>
      <ListItem />
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {topics && <TopicList topics={topics} />}
    </React.Fragment>
  );
};

export default Topics;

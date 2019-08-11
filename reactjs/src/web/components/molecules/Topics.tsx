import * as React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import PostButton from '../atoms/PostButton';
import Title from '../atoms/Title';

import TopicList from './TopicList';
import Progress from '../atoms/CircularProgress';
import NoStyledLink from '../atoms/NoStyledLink';

const Topics = (props: any) => {
  const {
    topics,
    loading,
    error,
    resourceId,
    postButtonPath,
    fetchTopics,
    topicPath,
    allowSensitive,
    fetchMutes,
    myUserId,
    fetchBlockingUsers
  } = props;

  React.useEffect(() => {
    fetchTopics(resourceId);
    fetchMutes(myUserId);
    fetchBlockingUsers(myUserId);
  }, [fetchBlockingUsers, fetchMutes, fetchTopics, myUserId, resourceId]);

  return (
    <React.Fragment>
      <ListItem>
        <ListItemText>
          <Title text="トピック" />
        </ListItemText>
        <PostButton
          to={postButtonPath}
          type="button"
          text="トピックを新規投稿"
        />
      </ListItem>
      <ListItem>
        <p>
          投稿する際は
          <NoStyledLink
            style={{ textDecoration: 'underline', fontWeight: 'bold' }}
            to="/guidelines"
          >
            Titanのコミュニティガイドライン
          </NoStyledLink>
          を遵守ください。
        </p>
      </ListItem>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {topics && (
        <TopicList
          topics={topics}
          topicPath={topicPath}
          allowSensitive={allowSensitive}
        />
      )}
    </React.Fragment>
  );
};

export default Topics;

import * as React from 'react';

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@material-ui/core';

import { fromNow } from '~/lib/moment';
import NoStyledLink from '../atoms/NoStyledLink';

const TopicListItem = (props: any) => {
  const { topic, topicPath, allowSensitive } = props;

  return (
    <ListItem alignItems="flex-start" key={topic.id}>
      <ListItemAvatar>
        <Avatar
          alt={topic.userName || 'anonymous'}
          src={topic.userPhotoURL || `${process.env.PUBLIC_URL}/anonymous.png`}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          topic.sensitive && !allowSensitive ? (
            <NoStyledLink to="/settings">
              センシティブな内容が含まれている可能性のあるコンテンツです
            </NoStyledLink>
          ) : (
            <NoStyledLink to={topicPath(topic.id)}>{topic.title}</NoStyledLink>
          )
        }
        secondary={
          topic.sensitive && !allowSensitive ? (
            <NoStyledLink to="/settings">設定を変更</NoStyledLink>
          ) : (
            <React.Fragment>
              <Typography component="span" variant="body2" color="textPrimary">
                Posted by {topic.userName || 'anonymous'}
              </Typography>
              {'     '}
              {fromNow(topic.createdAt.toDate())}
            </React.Fragment>
          )
        }
      />
    </ListItem>
  );
};

const TopicList = (props: any) => {
  const { topics, topicPath, limit, allowSensitive } = props;

  return (
    <List>
      {topics
        .slice(0, limit)
        .filter((topic: any) => !topic.banned)
        .map((topic: any) => (
          <TopicListItem
            key={topic.id}
            topic={topic}
            topicPath={topicPath}
            allowSensitive={allowSensitive}
          />
        ))}
    </List>
  );
};

export default TopicList;

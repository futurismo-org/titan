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

const TopicList = (props: any) => {
  const { topics, topicPath } = props;

  return (
    <List>
      {topics.map((topic: any) => (
        <ListItem alignItems="flex-start" key={topic.id}>
          <ListItemAvatar>
            <Avatar
              alt={topic.userName || 'anonymous'}
              src={
                topic.userPhotoURL || `${process.env.PUBLIC_URL}/anonymous.png`
              }
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <NoStyledLink to={topicPath(topic.id)}>
                {topic.title}
              </NoStyledLink>
            }
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  Posted by {topic.userName || 'anonymous'}
                </Typography>
                {'     '}
                {fromNow(topic.createdAt.toDate())}
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default TopicList;

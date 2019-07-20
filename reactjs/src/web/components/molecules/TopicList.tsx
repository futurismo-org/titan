import * as React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@material-ui/core';
import { useCollection } from 'react-firebase-hooks/firestore';
import moment from 'moment';

import firebase from 'lib/firebase';
import Progress from '../atoms/CircularProgress';

import NoStyledLink from '../atoms/NoStyledLink';

const TopicList = (props: any) => {
  const { topics } = props;

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
            primary={<NoStyledLink to="#">{topic.title}</NoStyledLink>}
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
                {moment(topic.createdAt.toDate()).fromNow() || ''}
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default TopicList;

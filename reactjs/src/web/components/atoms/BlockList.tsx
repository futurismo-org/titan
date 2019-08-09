import React from 'react';
import {
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';

import { formatDatetime } from '~/lib/moment';
import UserAvatar from './UserAvatar';

const BlockList = (props: any) => {
  const { blocks } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <List dense>
          {blocks.map((item: any) => (
            <ListItem key={item.id}>
              <ListItemAvatar>
                <UserAvatar
                  photoURL={item.blockedUserPhotoURL}
                  userId={item.blockedUserId}
                />
              </ListItemAvatar>
              <ListItemText
                primary={item.blockedUserDisplayName}
                secondary={`追加日 ${formatDatetime(item.createdAt.toDate())}`}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default BlockList;

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

const MuteList = (props: any) => {
  const { items } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <List dense>
          {items.map((item: any) => (
            <ListItem key={item.id}>
              <ListItemAvatar>
                <UserAvatar
                  photoURL={item.userPhotoURL}
                  userId={item.userShortId}
                />
              </ListItemAvatar>
              <ListItemText
                primary={item.userDisplayName}
                secondary={`追加日 ${formatDatetime(item.createdAt.toDate())}`}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default MuteList;

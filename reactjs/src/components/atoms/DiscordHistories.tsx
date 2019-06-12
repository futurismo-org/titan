import React, { useState, useEffect } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';

import moment from 'moment';
import { getMessages } from '../../lib/discord.client.api';

const changeAgo = (timestamp: Date) =>
  moment(timestamp)
    .fromNow()
    .toString();

const DiscordHistories = () => {
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    getMessages().then((data: any) => setHistories(data));
  }, []);

  return (
    <List>
      {histories &&
        histories
          .filter((history: any) => history.content !== '')
          .map((history: any) => (
            <React.Fragment key={history.id}>
              <ListItem>
                <ListItemText
                  secondary={`${history.author.username} ${changeAgo(
                    history.timestamp
                  )}`}
                  primary={history.content}
                />
              </ListItem>
              <Divider variant="fullWidth" />
            </React.Fragment>
          ))}
    </List>
  );
};

export default DiscordHistories;

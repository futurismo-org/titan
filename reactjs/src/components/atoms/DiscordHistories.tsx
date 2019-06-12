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

interface Props {
  channelId?: string;
  limit?: number;
}

const DiscordHistories = (props: Props) => {
  const [histories, setHistories] = useState([]);
  const { channelId, limit } = props;

  useEffect(() => {
    let mounted = true;

    const getHistories = async (props: Props) => {
      const data = await getMessages(props.channelId, props.limit);

      if (mounted) {
        setHistories(data);
      }
    };

    getHistories({ channelId, limit });

    return () => {
      mounted = false;
    };
  }, [channelId, limit, props]);

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

import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';
import Title from '../atoms/Title';
import Paper from '../templates/PaperWrapper';

import { meigens } from '~/lib/meigen';

const Item = (props: any) => {
  const { content, author } = props;
  return (
    <React.Fragment>
      <ListItem>
        <ListItemText>
          <Typography variant="h6">{content}</Typography>
          <Typography variant="body2" style={{ color: 'gray' }}>
            {author}
          </Typography>
        </ListItemText>
      </ListItem>
      <Divider />
    </React.Fragment>
  );
};

const Info = (props: any) => {
  return (
    <React.Fragment>
      <Paper>
        <Title text="努力の名言" />
        <List>
          {meigens.map((meigen: any) => (
            <Item
              content={meigen.content}
              author={meigen.author}
              key={meigen.content}
            />
          ))}
        </List>
      </Paper>
    </React.Fragment>
  );
};

export default Info;

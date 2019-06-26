import * as React from 'react';
import { Typography, ListItem, ListItemText } from '@material-ui/core';
import PostButton from '../atoms/PostButton';

import TopicList from './TopicList';

const Topics = (props: any) => {
  return (
    <React.Fragment>
      <ListItem>
        <ListItemText>
          <Typography variant="h4" component="h5">
            トピック
          </Typography>
        </ListItemText>
        <PostButton
          to={`/${props.collection}/${props.collectionId}/topics/new`}
          type="button"
        />
      </ListItem>
      <ListItem />
      <TopicList {...props} />
    </React.Fragment>
  );
};

export default Topics;

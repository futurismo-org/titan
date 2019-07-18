import * as React from 'react';
import { Typography, ListItem, ListItemText } from '@material-ui/core';
import PostButton from '../atoms/PostButton';

import TopicList from './TopicList';

const Topics = (props: any) => {
  const { collection, collectionId } = props;

  const collectionShort =
    collection === 'general' ? '' : collection === 'challenges' ? 'c' : 'cat';

  const postButtonPath =
    collection === 'general'
      ? '/topics/new'
      : `/${collectionShort}/${collectionId}/t/new`;

  return (
    <React.Fragment>
      <ListItem>
        <ListItemText>
          <Typography variant="h4" component="h5">
            トピック
          </Typography>
        </ListItemText>
        <PostButton to={postButtonPath} type="button" />
      </ListItem>
      <ListItem />
      <TopicList {...props} />
    </React.Fragment>
  );
};

export default Topics;

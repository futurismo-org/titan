import * as React from 'react';
import { Button } from '@material-ui/core';

import NoStyledLink from './NoStyledLink';

const PostButton = (props: any) => (
  <NoStyledLink to={props.to}>
    <Button type="button" variant="contained" color="primary">
      投稿
    </Button>
  </NoStyledLink>
);

export default PostButton;

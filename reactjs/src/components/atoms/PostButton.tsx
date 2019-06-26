import * as React from 'react';
import { Button } from '@material-ui/core';

import { connect } from 'react-redux';
import NoStyledLink from './NoStyledLink';

const PostButton = (props: any) =>
  props.isLogin ? (
    <NoStyledLink to={props.to}>
      <Button type="button" variant="contained" color="default">
        投稿
      </Button>
    </NoStyledLink>
  ) : null;

const mapStateToProps = (state: any, props: any) => ({
  isLogin: !state.firebase.profile.isEmpty,
  ...props
});

export default connect(mapStateToProps)(PostButton);

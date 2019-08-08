import * as React from 'react';
import { Button } from '@material-ui/core';

import { connect } from 'react-redux';
import NoStyledLink from 'web/components/atoms/NoStyledLink';

const PostButton = (props: any) =>
  props.isLogin ? (
    <NoStyledLink to={props.to}>
      <Button type="button" variant="contained" color="primary">
        投稿
      </Button>
    </NoStyledLink>
  ) : null;

const mapStateToProps = (state: any, props: any) => ({
  isLogin: !state.firebase.profile.isEmpty && state.firebase.profile.isLoaded,
  ...props
});

export default connect(mapStateToProps)(PostButton);

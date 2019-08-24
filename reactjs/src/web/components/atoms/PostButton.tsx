import * as React from 'react';
import { Button } from '@material-ui/core';

import { connect } from 'react-redux';
import NoStyledLink from '~/web/components/atoms/NoStyledLink';

const PostButton = (props: any) => {
  const text = props.text ? props.text : '投稿';

  return props.isLogin ? (
    <NoStyledLink to={props.to}>
      <Button
        type="button"
        variant="contained"
        color="primary"
        style={{ fontWeight: 'bold' }}
      >
        {text}
      </Button>
    </NoStyledLink>
  ) : null;
};

const mapStateToProps = (state: any, props: any) => ({
  isLogin: !state.user.profile.isEmpty && state.user.profile.isLoaded,
  ...props
});

export default connect(mapStateToProps)(PostButton);

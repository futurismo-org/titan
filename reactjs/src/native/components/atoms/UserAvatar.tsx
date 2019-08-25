import * as React from 'react';
import { Thumbnail } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { withRouter } from 'react-router-native';
import { ANONYMOUS_AVATAR_URL } from '~/lib/url';

const Avatar = (props: any) => {
  const {
    photoURL,
    userId,
    small,
    large,
    history,
    additionalHandler,
    to
  } = props;

  const path = to ? to : userId ? `/u/${userId}` : '/users';
  const src = photoURL || ANONYMOUS_AVATAR_URL;

  const handler = () => {
    history.replace(path);
    additionalHandler && additionalHandler();
  };

  return (
    <TouchableOpacity onPress={handler}>
      <Thumbnail source={{ uri: src }} small={small} large={large} />
    </TouchableOpacity>
  );
};

export default withRouter(Avatar);

import * as React from 'react';
import { Thumbnail } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { withRouter } from 'react-router-native';

const Avatar = (props: any) => {
  const { photoURL, userId, small, large, history, additionalHandler } = props;

  const path = userId ? `/u/${userId}` : '/users';
  const src = photoURL || 'https://titan-fire.com/anonymous.png';

  const handler = () => {
    history.push(path);
    additionalHandler && additionalHandler();
  };

  return (
    <TouchableOpacity onPress={handler}>
      <Thumbnail source={{ uri: src }} small={small} large={large} />
    </TouchableOpacity>
  );
};

export default withRouter(Avatar);

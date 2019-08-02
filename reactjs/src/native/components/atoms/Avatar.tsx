import * as React from 'react';
import { Thumbnail } from 'native-base';
import { Linking, TouchableOpacity } from 'react-native';
import { getTwitterProfileURL } from '~/lib/url';

const Avatar = (props: any) => {
  const { photoURL, twitterUsername, small } = props;

  return (
    <TouchableOpacity
      onPress={() => Linking.openURL(getTwitterProfileURL(twitterUsername))}
    >
      <Thumbnail source={{ uri: photoURL }} small={small} />
    </TouchableOpacity>
  );
};

export default Avatar;

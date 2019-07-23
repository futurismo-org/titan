import * as React from 'react';

import { Text } from 'native-base';
import { Linking } from 'expo';

const YoutubeWidget = (props: any) => {
  const youtubeId = props.id;
  const url = `https://www.youtube.com/watch?v=${youtubeId}`;
  return (
    <Text
      style={{ textDecorationLine: 'underline' }}
      onPress={() => Linking.openURL(url)}
    >
      Youtube動画へのリンク
    </Text>
  );
};

export default YoutubeWidget;

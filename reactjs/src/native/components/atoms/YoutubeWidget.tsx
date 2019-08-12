import * as React from 'react';
import { WebView } from 'react-native';

import { deviceWidth } from '~/native/lib/native';

const YoutubeWidget = (props: any) => {
  const youtubeId = props.id;
  const url = `https://www.youtube.com/embed/${youtubeId}?autoplay=0&showinfo=0&controls=0`;

  const width = deviceWidth - 20;
  const height = (width * 9) / 16;

  return (
    <WebView
      style={{ width, height, alignSelf: 'center', flex: 1, marginBottom: 10 }}
      javaScriptEnabled
      domStorageEnabled
      useWebKit
      source={{ uri: url }}
    />
  );
};

export default YoutubeWidget;

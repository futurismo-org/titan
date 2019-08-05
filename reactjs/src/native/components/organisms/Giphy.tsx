import React, { useState, useEffect } from 'react';

import { Text } from 'native-base';
import { ImageBackground, View } from 'react-native';
import { getRecordGiphyImageURL } from '~/lib/giphy';

import { primaryColor } from '~/lib/theme';

const Giphy = (props: any) => {
  const { type } = props;
  const message = type === 'win' ? 'You Win' : 'Never Mind';

  const [giphyURL, setGiphyURL] = useState('');

  useEffect(() => {
    let unmounted = false;
    const f = async () => {
      await new Promise(r => setTimeout(r, 1000));
      if (!unmounted) {
        getRecordGiphyImageURL(type).then((url: string) => setGiphyURL(url));
      }
    };
    f();
    const cleanup = () => {
      unmounted = true;
    };
    return cleanup;
  }, [type]);

  if (giphyURL === '') {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: primaryColor
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontSize: 60
          }}
        >
          {message}
        </Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: giphyURL }}
      style={{ width: '100%', height: '100%' }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontSize: 60
          }}
        >
          {message}
        </Text>
        <Text style={{ color: '#fff' }}>Powered By GIPHY</Text>
      </View>
    </ImageBackground>
  );
};

export default Giphy;

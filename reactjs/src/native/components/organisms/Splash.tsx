import React from 'react';

import { Text } from 'native-base';
import { ImageBackground, View } from 'react-native';
import { getRandomSplashImageURL } from '~/lib/url';
import { getRandomMeigen } from '~/lib/meigen';

const Splash = (prpos: any) => {
  const meigenData = getRandomMeigen();
  const { content, author }: any = meigenData;

  const colorWhite = 'white';

  return (
    <ImageBackground
      source={{ uri: getRandomSplashImageURL() }}
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
            color: colorWhite,
            fontSize: 60
          }}
        >
          Titan
        </Text>
        <Text
          style={{
            fontSize: 20,
            lineHeight: 25,
            color: colorWhite,
            padding: 20
          }}
        >
          {content}
        </Text>
        <Text style={{ color: colorWhite }}>{author}</Text>
      </View>
    </ImageBackground>
  );
};

export default Splash;

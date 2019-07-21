import * as React from 'react';
import { Button, Text } from 'native-base';
import { Linking } from 'react-native';

const TwitterShareIcon = (props: any) => {
  const { title, url, hashtag } = props;

  const title2 = title.replace('#', '%23');

  const buildTweetContent = `${title2}%0a${url}`;
  const buildHashTags = `${hashtag}`.replace('#', '');

  const twitterShareURLBuilder = `https://twitter.com/intent/tweet?text=${buildTweetContent}&hashtags=${buildHashTags}`;

  return (
    <Button info onPress={() => Linking.openURL(twitterShareURLBuilder)}>
      <Text>Twitterでシェア</Text>
    </Button>
  );
};

export default TwitterShareIcon;

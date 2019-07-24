import * as React from 'react';

import { Button, Text } from 'native-base';
import { Linking } from 'react-native';

const TwitterButton = (props: any) => {
  const { challenge } = props;

  const userId = 1; // TODO

  const shareURL = `https://titan-fire.com/c/${challenge.id}/u/${userId}`; // eslint-disable-line
  const title = challenge.title.replace('#', '%23');

  const buildTweetContent = `${title}参加中%0a${shareURL}`;
  const buildHashTags = `${challenge.hashtag}`.replace('#', '');

  const textBuilder = `https://twitter.com/intent/tweet?text=${buildTweetContent}&hashtags=${buildHashTags}`;

  return (
    <React.Fragment>
      <Button info full rounded onPress={() => Linking.openURL(textBuilder)}>
        <Text>Twitterでシェア</Text>
      </Button>
    </React.Fragment>
  );
};

export default TwitterButton;

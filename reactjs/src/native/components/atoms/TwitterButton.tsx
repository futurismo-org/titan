import * as React from 'react';

import { Button } from 'native-base';
import { Linking } from 'react-native';

const TwitterButton = (props: any) => {
  const { challenge } = props;

  const userId = 1;

  const shareURL = `https://titan-fire.com/c/${challenge.id}/u/${userId}`; // eslint-disable-line
  const title = challenge.title.replace('#', '%23');

  const buildTweetContent = `${title}参加中%0a${shareURL}`;
  const buildHashTags = `${challenge.hashtag}`.replace('#', '');

  const textBuilder = `https://twitter.com/intent/tweet?text=${buildTweetContent}&hashtags=${buildHashTags}`;

  return (
    <React.Fragment>
      {/* {user.shortId === userId ? ( */}
      <Button onPress={() => Linking.openURL(textBuilder)}>
        Twitterでシェア
      </Button>
      {/* ) : null} */}
    </React.Fragment>
  );
};

export default TwitterButton;

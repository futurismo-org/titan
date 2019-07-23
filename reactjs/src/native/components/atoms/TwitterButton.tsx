import * as React from 'react';

import { Button } from 'native-base';
import { Linking } from 'react-native';

const TwitterButton = (props: any) => {
  const { user, title, userId, challengeId, hashtag } = props;

  const shareURL = `https://titan-fire.com/c/${challengeId}/u/${userId}`; // eslint-disable-line
  const title2 = title.replace('#', '%23');

  const buildTweetContent = `${title2}参加中%0a${shareURL}`;
  const buildHashTags = `${hashtag}`.replace('#', '');

  const textBuilder = `https://twitter.com/intent/tweet?text=${buildTweetContent}&hashtags=${buildHashTags}`;

  return (
    <React.Fragment>
      {user.shortId === userId ? (
        <Button onPress={() => Linking.openURL(textBuilder)}>
          Twitterでシェア
        </Button>
      ) : null}
    </React.Fragment>
  );
};

export default TwitterButton;

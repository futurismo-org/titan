import React from 'react';
import { View, Button } from 'native-base';

import UserAvatar from '../atoms/UserAvatar';
import { getTwitterProfileURL } from '~/lib/url';
import TouchableText from '../atoms/TouchableText';

import MuteButton from '~/native/containers/MuteButtonContainer';
import BlockButton from '~/native/containers/BlockButtonContainer';

const ProfileHeader = (props: any) => {
  const { user, isLogin, isMyProfile } = props;

  return (
    <View>
      <UserAvatar photoURL={user.photoURL} userId={user.shortId} large />
      {!!user.twitterUsername && (
        <Button style={{ marginVertical: 15 }} info small>
          <TouchableText
            text="Twitter"
            url={getTwitterProfileURL(user.twitterUsername)}
            external
          />
        </Button>
      )}
      {isLogin && !isMyProfile && (
        <View style={{ marginTop: 20, flex: 1, flexDirection: 'row' }}>
          <MuteButton user={user} />
          <View style={{ marginLeft: 10 }}>
            <BlockButton user={user} />
          </View>
        </View>
      )}
    </View>
  );
};

export default ProfileHeader;

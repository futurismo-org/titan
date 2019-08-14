import React from 'react';
import { View, Text, Button } from 'native-base';

import { Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withRouter } from 'react-router-native';
import UserAvatar from '../atoms/UserAvatar';
import { getTwitterProfileURL, getRandomImageURL } from '~/lib/url';

import MuteButton from '~/native/containers/MuteButtonContainer';
import BlockButton from '~/native/containers/BlockButtonContainer';
import { StyledHero as Hero } from '~/native/components/atoms/Hero';

import TotalScoreBoard from '~/native/containers/TotalScoreBoardContainer';

import { twitterColor, brandGray } from '~/lib/theme';

import { formatYearDate } from '~/lib/moment';

const ProfileHeader = (props: any) => {
  const { user, isLogin, isMyProfile, history } = props;

  return (
    <View style={{ alignItems: 'center' }}>
      <Hero
        source={{ uri: getRandomImageURL() }}
        renderOverlay={() => <View style={{ height: 150 }} />}
      />
      <View style={{ translateY: -50 }}>
        <UserAvatar photoURL={user.photoURL} userId={user.shortId} large />
      </View>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          {user.displayName}
        </Text>
      </View>
      <TotalScoreBoard userShortId={user.shortId} />
      <View>
        <Text style={{ padding: 20 }}>{user.introduction}</Text>
      </View>
      {!!user.twitterUsername && (
        <View>
          <Icon
            size={40}
            name="twitter"
            color={twitterColor}
            onPress={() =>
              Linking.openURL(getTwitterProfileURL(user.twitterUsername))
            }
          />
        </View>
      )}
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ color: brandGray }}>
          登録日 {formatYearDate(user.createdAt.toDate())}
        </Text>
        <Text style={{ color: brandGray }}>
          更新日 {formatYearDate(user.updatedAt.toDate())}
        </Text>
      </View>
      {isLogin && !isMyProfile && (
        <View style={{ marginTop: 20, flex: 1, flexDirection: 'row' }}>
          <MuteButton user={user} />
          <View style={{ marginLeft: 10 }}>
            <BlockButton user={user} />
          </View>
        </View>
      )}
      {isLogin && isMyProfile && (
        <View style={{ marginTop: 20 }}>
          <Button rounded onPress={() => history.push('/settings')}>
            <Text>プロフィールを編集</Text>
          </Button>
        </View>
      )}
    </View>
  );
};

export default withRouter(ProfileHeader);

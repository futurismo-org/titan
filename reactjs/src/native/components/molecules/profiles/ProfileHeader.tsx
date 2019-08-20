import React from 'react';
import { View, Text, Button } from 'native-base';

import { Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withRouter } from 'react-router-native';
import UserAvatar from '../../atoms/UserAvatar';
import {
  getTwitterProfileURL,
  getRandomImageURL,
  ANONYMOUS_AVATAR_URL
} from '~/lib/url';

import MuteButton from '~/native/containers/MuteButtonContainer';
import BlockButton from '~/native/containers/BlockButtonContainer';
import { StyledHero as Hero } from '~/native/components/atoms/Hero';

import TotalScoreBoard from '~/native/containers/TotalScoreBoardContainer';

import { twitterColor, brandGray, primaryColor } from '~/lib/theme';
import Flag from '~/native/containers/FlagContainer';

import { formatYearDate } from '~/lib/moment';

const ProfileHeader = (props: any) => {
  const { user, isLogin, isMyProfile, history } = props;

  return (
    <View style={{ alignItems: 'center' }}>
      <Hero
        source={{ uri: getRandomImageURL() }}
        renderOverlay={() => <View style={{ height: 150 }} />}
      />
      <View style={{ alignItems: 'center', transform: [{ translateY: -50 }] }}>
        <UserAvatar photoURL={user.photoURL} userId={user.shortId} large />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          {user.displayName}
        </Text>
        <TotalScoreBoard userShortId={user.shortId} />
        {!!user.introduction && (
          <Text style={{ padding: 20 }}>{user.introduction}</Text>
        )}
        {!!user.twitterUsername && (
          <Icon
            size={40}
            name="twitter"
            color={twitterColor}
            onPress={() =>
              Linking.openURL(getTwitterProfileURL(user.twitterUsername))
            }
          />
        )}
        <Text />
        <Text style={{ color: brandGray }}>
          登録日 {formatYearDate(user.createdAt.toDate())}
        </Text>
        <Text style={{ color: brandGray }}>
          更新日 {formatYearDate(user.updatedAt.toDate())}
        </Text>
        <Text />
        {isLogin && isMyProfile && (
          <Button
            rounded
            onPress={() => history.push('/settings')}
            style={{ backgroundColor: primaryColor, alignSelf: 'center' }}
          >
            <Text>プロフィールを編集</Text>
          </Button>
        )}
        {isLogin && !isMyProfile && (
          <View style={{ marginTop: 20, flexDirection: 'row' }}>
            <MuteButton user={user} />
            <View style={{ marginLeft: 10 }}>
              <BlockButton user={user} />
            </View>
          </View>
        )}
        {!isMyProfile && <Flag profile={user} />}
      </View>
    </View>
  );
};

export default withRouter(ProfileHeader);

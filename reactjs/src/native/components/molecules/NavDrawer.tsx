import * as React from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import { Container, Content, List, ListItem, Text, View } from 'native-base';
import { withRouter } from 'react-router-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import ImageOverlay from 'react-native-image-overlay';
import { getRandomImageURL } from '~/lib/url';
import {
  // TITAN_BLOG_URL,
  // TITAN_TWITTER_URL,
  TITAN_DISCORD_INVITE_URL
} from '~/constants/appInfo';

import UserAvatar from '~/native/components/atoms/UserAvatar';
import { twitterColor } from '~/lib/theme';

const NavDrawer = (props: any) => {
  const {
    isLogin,
    displayName,
    photoURL,
    history,
    closeHandler,
    userId
  } = props;

  const routes = [
    { title: 'ホーム', key: '1', path: '/' },
    {
      title: 'マイページ',
      key: '2',
      path: `/u/${userId}`,
      loginonly: true
    },
    { title: 'チャレンジ', key: '3', path: '/challenges' },
    { title: 'カテゴリ', key: '4', path: '/categories' },
    { title: 'トピック', key: '5', path: '/topics' },
    { title: 'ランキング', key: '6', path: '/users' },
    {
      title: 'チャット',
      key: '7',
      path: TITAN_DISCORD_INVITE_URL,
      external: true
    },
    { title: '関連情報', key: '8', path: '/info' },
    {
      title: '設定',
      key: '9',
      path: '/settings',
      loginonly: true
    }
  ];
  return (
    <Container>
      <Content>
        <ImageOverlay
          source={{
            uri: getRandomImageURL()
          }}
          height={120}
          contentPosition="bottom"
          containerStyle={{ alignSelf: 'center' }}
        >
          {isLogin ? (
            <View style={{ alignItems: 'center' }}>
              <UserAvatar
                userId={userId}
                photoURL={photoURL}
                large
                additionalHandler={closeHandler}
              />
              <Text
                style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}
              >
                {displayName}
              </Text>
            </View>
          ) : null}
        </ImageOverlay>
        <List>
          {routes.map((item: any) => {
            if (item.loginonly && !isLogin) {
              return null;
            }

            return (
              <ListItem key={item.key}>
                {item.external ? (
                  <TouchableOpacity
                    onPress={() => Linking.openURL(item.path)}
                    style={{ flex: 1, alignSelf: 'center' }}
                  >
                    <Text>{item.title}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      history.push(item.path);
                      closeHandler();
                    }}
                    style={{ flex: 1, alignSelf: 'center' }}
                  >
                    <Text>{item.title}</Text>
                  </TouchableOpacity>
                )}
              </ListItem>
            );
          })}
        </List>
        {/* <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'center' }}>
          <Icon
            size={40}
            name="twitter"
            color={twitterColor}
            onPress={() => Linking.openURL(TITAN_TWITTER_URL)}
          />
          <Icon
            size={40}
            name="rss"
            color="orange"
            style={{ marginLeft: 30 }}
            onPress={() => Linking.openURL(TITAN_BLOG_URL)}
          />
        </View> */}
      </Content>
    </Container>
  );
};

export default withRouter(NavDrawer);

import * as React from 'react';
import { Image, FlatList, Linking } from 'react-native';
import { Container, Content, ListItem, Text, View } from 'native-base';
import { Link } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getRandomImageURL } from '~/lib/url';
import {
  TITAN_BLOG_URL,
  TITAN_TWITTER_URL,
  TITAN_DISCORD_INVITE_URL
} from '~/constants/appInfo';

const NavDrawer = (props: any) => {
  const routes = [
    { title: 'ホーム', key: '1', path: '/', external: false },
    { title: 'チャレンジ', key: '2', path: '/challenges', external: false },
    { title: 'カテゴリ', key: '3', path: '/categories', external: false },
    { title: 'トピック', key: '4', path: '/topics', external: false },
    { title: 'ランキング', key: '5', path: '/ranking', external: false },
    {
      title: 'チャット',
      key: '6',
      path: TITAN_DISCORD_INVITE_URL,
      external: true
    },
    { title: 'ユーザ設定', key: '7', path: '/settings', external: false },
    { title: '関連情報', key: '8', path: '/info', external: false }
  ];
  return (
    <Container>
      <Content>
        <Image
          source={{
            uri: getRandomImageURL()
          }}
          style={{
            height: 120,
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        />
        <FlatList
          data={routes}
          renderItem={({ item }) => (
            <ListItem>
              {item.external ? (
                <Text onPress={() => Linking.openURL(item.path)}>
                  {item.title}
                </Text>
              ) : (
                <Link to={item.path}>
                  <Text>{item.title}</Text>
                </Link>
              )}
            </ListItem>
          )}
        />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Icon
            size={40}
            name="twitter"
            color="#4099FF"
            style={{ marginLeft: 10 }}
            onPress={() => Linking.openURL(TITAN_TWITTER_URL)}
          />
          <Icon
            size={40}
            name="rss"
            color="orange"
            style={{ marginLeft: 30 }}
            onPress={() => Linking.openURL(TITAN_BLOG_URL)}
          />
        </View>
      </Content>
    </Container>
  );
};

export default NavDrawer;

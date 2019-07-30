import * as React from 'react';
import { Image, FlatList, Linking } from 'react-native';
import { Container, Content, ListItem, Text } from 'native-base';
import { Link } from 'react-router-native';
import { getRandomImageURL } from '~/lib/url';

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
      path: 'https://discord.gg/S3t5WgE',
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
      </Content>
    </Container>
  );
};

export default NavDrawer;

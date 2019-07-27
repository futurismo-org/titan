import * as React from 'react';
import { Image, FlatList } from 'react-native';
import { Container, Content, ListItem, Text } from 'native-base';
import { Link } from 'react-router-native';
import { getRandomImageURL } from '~/lib/url';

const NavDrawer = (props: any) => {
  const routes = [
    { title: 'ホーム', key: '1', path: '/' },
    { title: 'チャレンジ', key: '2', path: '/challenges' },
    { title: 'カテゴリ', key: '3', path: '/categories' },
    { title: 'トピック', key: '4', path: '/topics' },
    { title: 'ランキング', key: '5', path: '/ranking' },
    // { title: 'チャット', key: '6', path: 'https://discord.gg/S3t5WgE' },
    { title: 'ユーザ設定', key: '7', path: '/settings' }
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
              <Link to={item.path}>
                <Text>{item.title}</Text>
              </Link>
            </ListItem>
          )}
        />
      </Content>
    </Container>
  );
};

export default NavDrawer;

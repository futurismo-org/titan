import * as React from 'react';
import { Image, FlatList } from 'react-native';
import { Container, Content, ListItem, Text } from 'native-base';
import { Link } from 'react-router-native';

const NavDrawer = (props: any) => {
  const routes = [
    { title: 'ホーム', key: '1', path: '/' },
    { title: 'チャレンジ', key: '2', path: 'challenges' },
    { title: 'カテゴリ', key: '3', path: 'categories' }
  ];
  return (
    <Container>
      <Content>
        <Image
          source={{
            uri: 'https://source.unsplash.com/random'
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

import * as React from 'react';
import { List, ListItem, Text } from 'native-base';
import { Linking } from 'expo';

const Info = (props: any) => {
  return (
    <List>
      <ListItem>
        <Text
          onPress={() =>
            Linking.openURL('https://titan-fire.com/terms_of_use.html')
          }
        >
          利用規約
        </Text>
      </ListItem>
      <ListItem>
        <Text
          onPress={() =>
            Linking.openURL('https://titan-fire.com/privacy_policy.html')
          }
        >
          プライバシーポリシー
        </Text>
      </ListItem>
      <ListItem>
        <Text onPress={() => Linking.openURL('https://titan-fire.com')}>
          Titan for Web App
        </Text>
      </ListItem>
      <ListItem>
        <Text onPress={() => Linking.openURL('https://titan-fire.netlify.com')}>
          Titan紹介ページ
        </Text>
      </ListItem>
    </List>
  );
};

export default Info;

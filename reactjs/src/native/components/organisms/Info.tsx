import * as React from 'react';
import { List, ListItem, Text } from 'native-base';
import { Linking } from 'expo';
import Title from '../atoms/Title';

const Info = (props: any) => {
  return (
    <React.Fragment>
      <Title text="関連情報" />
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
          <Text
            onPress={() => Linking.openURL('https://titan-fire.netlify.com')}
          >
            Titan紹介ページ
          </Text>
        </ListItem>
      </List>
    </React.Fragment>
  );
};

export default Info;

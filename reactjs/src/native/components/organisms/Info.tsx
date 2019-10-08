import * as React from 'react';
import { List, ListItem, Text } from 'native-base';
import { Linking } from 'expo';
import { withRouter } from 'react-router-native';
import Title from '../atoms/Title';

import {
  APP_PRODUCTION_URL,
  TITAN_GOOGLE_PLAY_STORE,
  TITAN_APPLE_STORE
} from '~/constants/appInfo';
import { BUILD_TIMESTAMP, BUILD_COMMIT_ID } from '~/constants/buildInfo'; // eslint-disable-line

import { isAndroid, isiOS } from '~/native/lib/native';

const Info = (props: any) => {
  const { history } = props;
  return (
    <React.Fragment>
      <Title text="関連情報" />
      <List>
        <ListItem>
          <Text onPress={() => history.push('/terms_of_use')}>利用規約</Text>
        </ListItem>
        <ListItem>
          <Text onPress={() => history.push('/privacy_policy')}>
            プライバシーポリシー
          </Text>
        </ListItem>
        <ListItem>
          <Text onPress={() => history.push('/guidelines')}>
            コミュニティガイドライン
          </Text>
        </ListItem>
        <ListItem>
          <Text onPress={() => history.push('/about')}>Titanについて</Text>
        </ListItem>
        <ListItem>
          <Text onPress={() => history.push('/contact')}>お問い合わせ</Text>
        </ListItem>
        <ListItem>
          <Text onPress={() => history.push('/meigen')}>努力の名言集</Text>
        </ListItem>
        <ListItem>
          <Text onPress={() => Linking.openURL(APP_PRODUCTION_URL)}>
            Titan for Web App
          </Text>
        </ListItem>
        {/* {isAndroid && ( // ガイドラインの関係でiOSはリンクを貼らない
          <ListItem>
            <Text onPress={() => Linking.openURL(TITAN_LANDING_PAGE)}>
              Titan宣伝用特設サイト
            </Text>
          </ListItem>
        )} */}
        {isAndroid && (
          <ListItem>
            <Text onPress={() => Linking.openURL(TITAN_GOOGLE_PLAY_STORE)}>
              Google Play Store
            </Text>
          </ListItem>
        )}
        {isiOS && (
          <ListItem>
            <Text onPress={() => Linking.openURL(TITAN_APPLE_STORE)}>
              Apple Store
            </Text>
          </ListItem>
        )}
        <ListItem>
          <Text>Build Date: {BUILD_TIMESTAMP}</Text>
        </ListItem>
        <ListItem>
          <Text>Build ID: {BUILD_COMMIT_ID}</Text>
        </ListItem>
      </List>
    </React.Fragment>
  );
};

export default withRouter(Info);

import React, { useState } from 'react';

import { View } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';

import { withRouter } from 'react-router-native';
import { Button, Text } from 'native-base';
import TouchableText from '../../atoms/TouchableText';
import {
  getChallengeUserGoalPath,
  getChallengeUserActivitiesPath
} from '~/lib/url';

const ChallengeNavbar = (props: any) => {
  const { challenge, userShortId, history, join } = props;
  const challengeId = challenge.id;

  const [menuRef, setMenuRef] = useState();

  const hideMenu = (path: string) => {
    history.push(path);
    menuRef.hide();
  };

  const showMenu = () => {
    menuRef.show();
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        alignSelf: 'center'
      }}
    >
      <Button bordered style={{ width: 100, justifyContent: 'center' }}>
        <TouchableText path={`/c/${challengeId}/overview`} text="概要" />
      </Button>
      <Button
        bordered
        style={{ width: 100, marginLeft: 5, justifyContent: 'center' }}
      >
        <TouchableText path={`/c/${challengeId}/rules`} text="ルール" />
      </Button>
      <Menu
        ref={(ref: any) => setMenuRef(ref)}
        button={
          <Button
            bordered
            style={{ width: 100, marginLeft: 5, justifyContent: 'center' }}
          >
            <Text onPress={showMenu}>その他</Text>
          </Button>
        }
      >
        <MenuItem onPress={() => hideMenu(`/c/${challengeId}/leaderboard`)}>
          リーダーボード
        </MenuItem>
        {join && (
          <MenuItem
            onPress={() => hideMenu(`/c/${challengeId}/u/${userShortId}`)}
          >
            ダッシュボード
          </MenuItem>
        )}
        <MenuItem onPress={() => hideMenu(`/c/${challengeId}/goals`)}>
          ゴールボード
        </MenuItem>
        <MenuItem onPress={() => hideMenu(`/c/${challengeId}/topics`)}>
          トピック
        </MenuItem>
        <MenuItem onPress={() => hideMenu(`/c/${challengeId}/timeline`)}>
          タイムライン
        </MenuItem>
        {join && (
          <MenuItem
            onPress={() =>
              hideMenu(getChallengeUserActivitiesPath(challengeId, userShortId))
            }
          >
            行動ノート
          </MenuItem>
        )}
        {join && (
          <MenuItem
            onPress={() =>
              hideMenu(getChallengeUserGoalPath(challengeId, userShortId))
            }
          >
            目標ノート
          </MenuItem>
        )}
        {join && (
          <MenuItem
            onPress={() =>
              hideMenu(`/c/${challengeId}/u/${userShortId}/settings`)
            }
          >
            ユーザ設定
          </MenuItem>
        )}
      </Menu>
    </View>
  );
};

export default withRouter(ChallengeNavbar);

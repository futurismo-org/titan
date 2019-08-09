import React, { useState, useEffect } from 'react';

import { Form, Item, Label, Text, Input, Switch, View } from 'native-base';
import { Keyboard } from 'react-native';
import Title from '../atoms/Title';
import SubmitButton from '../atoms/SubmitButton';

import { successToastWithNoRedirect, errorToast } from '../atoms/Toast';
import { primaryColor } from '~/lib/theme';

const Settings = (props: any) => {
  const { user, isLogin, updateHandler } = props;

  const [displayName, setDisplayName] = useState('');
  const [twitterUsername, setTwitterUsername] = useState('');
  const [allowSensitive, setAllowSensitive] = useState(false);

  const updateHandlerWithMessage = (data: any) => {
    Keyboard.dismiss();

    updateHandler(data)
      .then(() => successToastWithNoRedirect('設定を更新しました。'))
      .catch(() => errorToast('エラーが発生しました。'));
  };

  const onAllowSensitiveChange = (value: any) => setAllowSensitive(value);

  useEffect(() => {
    setDisplayName(user.displayName ? user.displayName : '');
    setTwitterUsername(user.twitterUsername ? user.twitterUsername : '');
    setAllowSensitive(user.allowSensitive ? user.allowSensitive : false);
  }, [user]);

  return (
    <React.Fragment>
      <Title text="設定" />
      {isLogin ? (
        <Form>
          <Item>
            <Label>ユーザ名</Label>
            <Input
              value={displayName}
              onChangeText={text => setDisplayName(text)}
            />
          </Item>
          <Item>
            <Label>Twitterユーザ名</Label>
            <Input
              value={twitterUsername}
              onChangeText={text => setTwitterUsername(text)}
            />
          </Item>
          <View style={{ padding: 10 }}>
            <Text>センシティブなコンテンツを表示する</Text>
            <Switch
              value={allowSensitive}
              onValueChange={onAllowSensitiveChange}
              thumbColor={primaryColor}
              style={{
                alignSelf: 'flex-start',
                marginTop: 10
              }}
            />
          </View>
          <Text />
          <Text style={{ marginHorizontal: 10, lineHeight: 20 }}>
            ユーザアイコンのアップロードはWebのみサポートしています。
          </Text>
          <SubmitButton
            text="設定を更新"
            handler={() =>
              updateHandlerWithMessage({
                displayName,
                twitterUsername,
                allowSensitive
              })
            }
          />
        </Form>
      ) : (
        <Text>ログインが必要です。</Text>
      )}
    </React.Fragment>
  );
};

export default Settings;

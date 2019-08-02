import React, { useState, useEffect } from 'react';

import { Form, Item, Label, Text, Input, Switch, View } from 'native-base';
import Title from '../atoms/Title';
import SubmitButton from '../atoms/SubmitButton';

import { successToastWithNoRedirect, errorToast } from '../atoms/Toast';

import { isiOS } from '~/lib/native';

const Settings = (props: any) => {
  const { user, isLogin, updateHandler } = props;

  const [displayName, setDisplayName] = useState('');
  const [twitterUsername, setTwitterUsername] = useState('');
  const [allowSensitive, setAllowSensitive] = useState(false);

  const updateHandlerWithMessage = (data: any) => {
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
      <Title text="ユーザ設定" />
      {isLogin ? (
        <Form>
          <Item floatingLabel>
            <Label>ユーザ名</Label>
            <Input
              value={displayName}
              onChangeText={text => setDisplayName(text)}
            />
          </Item>
          <Item floatingLabel>
            <Label>TwitterID</Label>
            <Input
              value={twitterUsername}
              onChangeText={text => setTwitterUsername(text)}
            />
          </Item>
          {isiOS && (
            <View style={{ padding: 10 }}>
              <Text>センシティブなコンテンツを表示する</Text>
              <Switch
                value={allowSensitive}
                onValueChange={onAllowSensitiveChange}
                style={{ marginTop: 10 }}
              />
            </View>
          )}
          <SubmitButton
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

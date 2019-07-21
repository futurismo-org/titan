import React, { useState, useEffect } from 'react';

import { Form, Item, Label, Text, Input } from 'native-base';
import Title from '../atoms/Title';
import SubmitButton from '../atoms/SubmitButton';

const Settings = (props: any) => {
  const { user, isLogin, updateHandler } = props;

  const [displayName, setDisplayName] = useState('');
  const [twitterUsername, setTwitterUsername] = useState('');

  useEffect(() => {
    setDisplayName(user.displayName ? user.displayName : '');
    setTwitterUsername(user.twitterUsername ? user.twitterUsername : '');
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
          <SubmitButton
            handler={() => updateHandler({ displayName, twitterUsername })}
          />
        </Form>
      ) : (
        <Text>ログインが必要です。</Text>
      )}
    </React.Fragment>
  );
};

export default Settings;

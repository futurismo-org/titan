import React, { useState } from 'react';

import { Text, Textarea, Button } from 'native-base';
import { successToastWithNoRedirect, errorToast } from '../atoms/Toast';

const FlagForm = (props: any) => {
  const { isLogin, handler } = props;

  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  const postHandler = (data: any) => {
    if (data.title === '' || data.content === '' || data.email === '') {
      errorToast('入力された情報が足りません。送信内容を確認してください。');
      return;
    }

    handler(data).then(() =>
      successToastWithNoRedirect('連絡が完了しました。返信をお待ちください。')
    );
  };

  return (
    <React.Fragment>
      {isLogin ? (
        <React.Fragment>
          <Text />
          <Textarea
            bordered
            rowSpan={1}
            placeholder="タイトル"
            value={title}
            onChangeText={(text: string) => setTitle(text)}
          />
          <Text />
          <Textarea
            bordered
            rowSpan={1}
            placeholder="Email: 返信に必要"
            value={email}
            onChangeText={(text: string) => setEmail(text)}
          />
          <Text />
          <Textarea
            bordered
            rowSpan={5}
            placeholder="内容"
            value={content}
            onChangeText={(text: string) => setContent(text)}
          />
          <Text />
          <Button
            onPress={() =>
              postHandler({
                content,
                email,
                title
              })
            }
          >
            <Text>送信</Text>
          </Button>
        </React.Fragment>
      ) : (
        <Text>お問い合わせにはログインが必要です。</Text>
      )}
    </React.Fragment>
  );
};

export default FlagForm;

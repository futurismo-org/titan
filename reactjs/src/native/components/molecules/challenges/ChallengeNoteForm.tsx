import React, { useState } from 'react';
import { View, Button, Text, Textarea } from 'native-base';
import { withRouter } from 'react-router-native';
import { brandWhite } from '~/lib/theme';
import { POST_TYPE_NOTE } from '~/constants/post';
import { successToastWithNoRedirect } from '../../atoms/Toast';

const ChallengeNoteForm = (props: any) => {
  const { closeHandler, saveHandler, history, location } = props;

  const [text, setText] = useState('');
  const [type, setType] = useState(POST_TYPE_NOTE);

  const onSave = () => {
    saveHandler({ text, type })
      .then(closeHandler)
      .then(() => {
        const path = location.pathname;
        history.push('/');
        history.push(path);
      })
      .then(() => successToastWithNoRedirect('ノートを投稿しました。'));
  };

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: brandWhite
      }}
    >
      <Textarea
        bordered
        rowSpan={8}
        value={text}
        onChangeText={(text: string) => setText(text)}
      />
      <Text />
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Button onPress={closeHandler} light>
          <Text>キャンセル</Text>
        </Button>
        <Button onPress={onSave} style={{ marginLeft: 5 }}>
          <Text>保存</Text>
        </Button>
      </View>
    </View>
  );
};

export default withRouter(ChallengeNoteForm);

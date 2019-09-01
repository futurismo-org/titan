import React, { useState } from 'react';
import { View, Button, Text, Textarea } from 'native-base';
import { withRouter } from 'react-router-native';
import RadioForm from 'react-native-simple-radio-button';
import { brandWhite, primaryColor } from '~/lib/theme';
import {
  POST_TYPE_NOTE,
  POST_TYPE_SUCCESS,
  POST_TYPE_ANALYSIS
} from '~/constants/post';
import { successToastWithNoRedirect } from '../../atoms/Toast';

const ChallengeNoteForm = (props: any) => {
  const {
    closeHandler,
    saveHandler,
    history,
    location,
    initialText,
    initialType,
    isEdit
  } = props;

  const [text, setText] = useState(initialText || '');
  const [type, setType] = useState(initialType || POST_TYPE_NOTE);

  const POST_MESSAGE = isEdit
    ? 'ノートを更新しました。'
    : 'ノートを投稿しました。';

  const onSave = () => {
    saveHandler({ text, type })
      .then(closeHandler)
      .then(() => {
        const path = location.pathname;
        history.push('/');
        history.push(path);
      })
      .then(() => successToastWithNoRedirect(POST_MESSAGE));
  };

  const radioProps = [
    { label: 'メモ', value: 0 },
    { label: '達成メモ', value: 1 },
    { label: '分析メモ', value: 2 }
  ];

  const radioList = [POST_TYPE_NOTE, POST_TYPE_SUCCESS, POST_TYPE_ANALYSIS];
  const radioMap = new Map([
    [POST_TYPE_NOTE, 0],
    [POST_TYPE_SUCCESS, 1],
    [POST_TYPE_ANALYSIS, 2]
  ]);

  const onTypeChange = (value: number) => {
    setType(radioList[value]);
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
      <RadioForm
        buttonSize={10}
        radio_props={radioProps}
        initial={radioMap.get(type)}
        buttonColor={primaryColor}
        selectedButtonColor={primaryColor}
        animation
        formHorizontal
        onPress={onTypeChange}
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

import React, { useState } from 'react';

import { Text, Textarea, Button, View } from 'native-base';
import RadioForm from 'react-native-simple-radio-button';
import { brandGray as gray } from '~/lib/theme';
import { successToastWithNoRedirect } from './Toast';

const SEXCIAL_CONTENT = '性的なコンテンツ';
const VIOLENT_CONTENT = '暴力的または不快なコンテンツ';
const OFFENSIVE_CONTENT = '差別的または攻撃的なコンテンツ';
const SPAM_CONTENT = 'スパムの可能性のあるコンテンツ';

const FlagForm = (props: any) => {
  const {
    topic,
    challenge,
    category,
    profile,
    collectionType,
    collectionId,
    handleClose,
    handler
  } = props;

  const [content, setContent] = useState('');
  const [reportType, setReportType] = useState(SEXCIAL_CONTENT);

  const radioList = [
    SEXCIAL_CONTENT,
    VIOLENT_CONTENT,
    OFFENSIVE_CONTENT,
    SPAM_CONTENT
  ];

  // const radioMap = new Map([
  //   [SEXCIAL_CONTENT, 0],
  //   [VIOLENT_CONTENT, 1],
  //   [OFFENSIVE_CONTENT, 2],
  //   [SPAM_CONTENT, 3]
  // ]);

  const radioProps = [
    { label: SEXCIAL_CONTENT, value: 0 },
    { label: VIOLENT_CONTENT, value: 1 },
    { label: OFFENSIVE_CONTENT, value: 2 },
    { label: SPAM_CONTENT, value: 3 }
  ];

  const onReportTypePress = (value: number) => {
    setReportType(radioList[value]);
  };

  const postHandler = (data: any) => {
    handler(
      topic,
      challenge,
      category,
      profile,
      collectionType,
      collectionId,
      data
    )
      .then(() => handleClose())
      .then(() => successToastWithNoRedirect('報告が完了しました。'));
  };

  return (
    <React.Fragment>
      <Text />
      <RadioForm
        buttonSize={15}
        radio_props={radioProps}
        initial={0}
        onPress={onReportTypePress}
        labelStyle={{ color: '#fff' }}
      />
      <Text />
      <Textarea
        bordered
        rowSpan={5}
        placeholder="問題の内容"
        placeholderTextColor="#fff"
        value={content}
        style={{ color: '#fff' }}
        onChangeText={(text: string) => setContent(text)}
      />
      <Text />
      <View
        style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}
      >
        <Button style={{ backgroundColor: gray }} onPress={handleClose}>
          <Text>閉じる</Text>
        </Button>
        <Button
          style={{ backgroundColor: gray, marginLeft: 10 }}
          onPress={() =>
            postHandler({
              content,
              reportType
            })
          }
        >
          <Text>報告</Text>
        </Button>
      </View>
    </React.Fragment>
  );
};

export default FlagForm;

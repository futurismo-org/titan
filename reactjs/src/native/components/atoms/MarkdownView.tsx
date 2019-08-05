import * as React from 'react';
import Markdown from 'react-native-markdown-renderer';
import { View } from 'react-native';

const MarkdownView = (props: any) => (
  <View style={{ flex: 1 }}>
    <Markdown
      style={{
        text: { fontFamily: 'MPLUS1p', paddingTop: 10 }
      }}
    >
      {props.text}
    </Markdown>
  </View>
);

export default MarkdownView;

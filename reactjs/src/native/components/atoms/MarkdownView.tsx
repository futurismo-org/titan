import * as React from 'react';
import Markdown, { getUniqueID } from 'react-native-markdown-renderer';
import { Text } from 'native-base';
import { View } from 'react-native';

// const rules = {
//   heading1: (node: any, children: any, parent: any, styles: any) => (
//     <Text
//       key={getUniqueID()}
//       style={[styles.heading, styles.heading1, { paddingTop: padding }]}
//     >
//       [{children}]
//     </Text>
//   ),
//   heading2: (node: any, children: any, parent: any, styles: any) => (
//     <Text
//       key={getUniqueID()}
//       style={[styles.heading, styles.heading2, { paddingTop: 10 }]}
//     >
//       [{children}]
//     </Text>
//   ),
//   heading3: (node: any, children: any, parent: any, styles: any) => (
//     <Text
//       key={getUniqueID()}
//       style={[styles.heading, styles.heading3, { paddingTop: 10 }]}
//     >
//       [{children}]
//     </Text>
//   )
// };

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

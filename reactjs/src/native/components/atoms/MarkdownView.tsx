import * as React from 'react';
import Markdown from 'react-native-markdown-renderer';

const MarkdownView = (props: any) => <Markdown>{props.text}</Markdown>;

export default MarkdownView;

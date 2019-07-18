import * as React from 'react';
import { Text } from 'react-native';

interface Props {
  text: string;
}

const Title = (props: Props) => <Text>{props.text}</Text>;

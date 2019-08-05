import * as React from 'react';
import { Text } from 'native-base';
import { human } from 'react-native-typography';
import styled from 'styled-components';

const StyledText = styled(Text)`
  margin-bottom: 12px;
  margin-top: 6px;
`;

const Title = (props: any) => {
  const { text } = props;

  return <StyledText style={human.largeTitle}>{text}</StyledText>;
};

export default Title;

import * as React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';

const StyledText = styled(Text)`
  font-size: 36px;
  margin-bottom: 12px;
`;

const Title = (props: any) => {
  const { text } = props;

  return <StyledText>{text}</StyledText>;
};

export default Title;

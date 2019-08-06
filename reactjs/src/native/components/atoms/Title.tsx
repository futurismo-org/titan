import * as React from 'react';
import { Text } from 'native-base';
import { human } from 'react-native-typography';
import styled from 'styled-components';

const Title = (props: any) => {
  const { text, left } = props;

  const align = left ? 'left' : 'center';

  const StyledText = styled(Text)`
    margin-bottom: 12px;
    margin-top: 6px;
    text-align: ${align};
  `;

  return <StyledText style={human.title1}>{text}</StyledText>;
};

export default Title;

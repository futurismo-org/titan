import * as React from 'react';
import { Text } from 'react-native';

const MyCustomText = (props: any) => {
  return (
    <Text styles={{ fontFamily: 'MPLUS1p' }} {...props}>
      {props.children}
    </Text>
  );
};

export default MyCustomText;

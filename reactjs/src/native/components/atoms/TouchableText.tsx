import * as React from 'react';
import { withRouter } from 'react-router-native';
import { TouchableOpacity } from 'react-native';
import { Text } from 'native-base';

const TouchableText = (props: any) => {
  const { path, text, history } = props;
  return (
    <TouchableOpacity onPress={() => history.push(path)}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default withRouter(TouchableText);

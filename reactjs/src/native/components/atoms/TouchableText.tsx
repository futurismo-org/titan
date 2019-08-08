import * as React from 'react';
import { withRouter } from 'react-router-native';
import { TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import { Linking } from 'expo';

const TouchableText = (props: any) => {
  const { path, text, external, url, history, color } = props;

  const pressHandler = external
    ? () => Linking.openURL(url)
    : () => history.push(path);

  return (
    <TouchableOpacity onPress={pressHandler}>
      <Text style={{ fontWeight: 'bold' } && color ? { color: color } : {}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default withRouter(TouchableText);

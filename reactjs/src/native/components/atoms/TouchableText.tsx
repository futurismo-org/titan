import * as React from 'react';
import { withRouter } from 'react-router-native';
import { TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import { Linking } from 'expo';

const TouchableText = (props: any) => {
  const {
    path,
    text,
    external,
    url,
    history,
    color,
    handler,
    underline,
    size
  } = props;

  const pressHandler = handler
    ? handler
    : external
    ? () => Linking.openURL(url)
    : () => history.push(path);

  const style = Object.assign(
    { fontWeight: 'bold' },
    color ? { color: color } : {},
    underline ? { textDecorationLine: 'underline' } : {},
    size ? { fontSize: size } : {}
  );

  return (
    <TouchableOpacity onPress={pressHandler}>
      <Text style={style}>{text}</Text>
    </TouchableOpacity>
  );
};

export default withRouter(TouchableText);

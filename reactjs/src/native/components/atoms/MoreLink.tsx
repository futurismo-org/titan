import * as React from 'react';
import { withRouter } from 'react-router-native';
import { TouchableOpacity } from 'react-native';
import { Text, View } from 'native-base';

import { primaryColor } from '~/lib/theme';

const MoreLink = (props: any) => {
  const { to, history } = props;

  return (
    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <TouchableOpacity onPress={() => history.replace(to)}>
        <Text
          style={{
            color: primaryColor,
            fontSize: 15,
            marginTop: 10
          }}
        >
          もっと見る
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default withRouter(MoreLink);

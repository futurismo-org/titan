import * as React from 'react';
import { Link } from 'react-router-native';
import { Text, View } from 'native-base';

import { primaryColor } from '~/lib/theme';

const MoreLink = (props: any) => {
  const { to } = props;

  return (
    <View style={{ flex: 1 }}>
      <Link to={to}>
        <Text
          style={{
            color: primaryColor,
            textAlign: 'right',
            fontSize: 15
          }}
        >
          もっと見る
        </Text>
      </Link>
    </View>
  );
};

export default MoreLink;

import * as React from 'react';

import { Text } from 'native-base';

const Error = (props: any) => {
  const { error } = props;

  return <Text>Error: {error}</Text>;
};

export default Error;

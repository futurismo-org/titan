import * as React from 'react';

import { Button, Text } from 'native-base';

interface Props {
  handler: any;
  text?: string;
}

const SubmitButton = (props: Props) => (
  <React.Fragment>
    <Text />
    <Button full rounded primary onPress={props.handler}>
      <Text>{props.text || '投稿'}</Text>
    </Button>
  </React.Fragment>
);

export default SubmitButton;

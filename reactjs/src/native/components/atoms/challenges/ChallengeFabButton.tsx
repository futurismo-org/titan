import React, { useState } from 'react';
import { Fab, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import { primaryColor, secondaryColor } from '~/lib/theme';

const ChallengeButton = (props: any) => {
  const { challenge } = props;
  const [active, setActive] = useState(false);

  return (
    <Fab
      active={active}
      direction="up"
      containerStyle={{}}
      style={{ backgroundColor: primaryColor }}
      position="bottomRight"
      onPress={() => setActive(!active)}
    >
      <Icon name="plus" />
      <Button style={{ backgroundColor: secondaryColor }}>
        <Icon name="remove" />
      </Button>
      <Button style={{ backgroundColor: primaryColor }}>
        <Icon name="check" />
      </Button>
    </Fab>
  );
};

export default ChallengeButton;

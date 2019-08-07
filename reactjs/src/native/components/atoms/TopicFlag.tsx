import * as React from 'react';

import { Text, View } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { carouselBlack as black, carouselGray as gray } from '~/lib/theme';

import TopicFlagForm from '~/web/containers/TopicFlagFormContainer';

const TopicFlag = (props: any) => {
  const { isLogin, topic, type } = props;
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Icon name="flag" color={gray} size={20} />
      <Text style={{ color: gray }}> 報告</Text>
    </View>
  );
};

export default TopicFlag;

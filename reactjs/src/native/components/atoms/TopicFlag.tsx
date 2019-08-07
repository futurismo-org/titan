import React, { useRef } from 'react';

import { Text, View } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modalize from 'react-native-modalize';
import { TouchableOpacity } from 'react-native';
import { carouselGray as gray, carouselBlack as black } from '~/lib/theme';

import TopicFlagForm from '~/native/containers/TopicFlagFormContainer';

const TopicFlag = (props: any) => {
  const { isLogin, topic, type } = props;

  const modalRef = useRef<Modalize>(null);

  const onOpen = () => {
    const modal = modalRef.current;

    if (modal) {
      modal.open();
    }
  };

  const onClosed = () => {
    const modal = modalRef.current;

    if (modal) {
      modal.close();
    }
  };

  return (
    <React.Fragment>
      <TouchableOpacity onPress={onOpen}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Icon name="flag" color={gray} size={20} />
          <Text style={{ color: gray }}> 報告</Text>
        </View>
      </TouchableOpacity>
      <Modalize
        ref={modalRef}
        onClosed={onClosed}
        adjustToContentHeight
        modalStyle={{ backgroundColor: black }}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ fontSize: 20, color: '#fff' }}>
            不適切なコンテンツの報告
          </Text>
          {isLogin ? (
            <TopicFlagForm topic={topic} type={type} handleClose={onClosed} />
          ) : (
            <Text>報告にはログインが必要です。</Text>
          )}
        </View>
      </Modalize>
    </React.Fragment>
  );
};

export default TopicFlag;

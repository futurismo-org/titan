import React, { useState } from 'react';

import { Text, View, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native';
import { carouselGray as gray, carouselBlack as black } from '~/lib/theme';

import TopicFlagForm from '~/native/containers/TopicFlagFormContainer';

const TopicFlag = (props: any) => {
  const { isLogin, topic, collectionType, collectionId } = props;

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <React.Fragment>
      <TouchableOpacity onPress={toggleModal}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Icon name="flag" color={gray} size={20} />
          <Text style={{ color: gray }}> 報告</Text>
        </View>
      </TouchableOpacity>
      <Modal isVisible={modal} avoidKeyboard>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 20, color: '#fff' }}>
            不適切なコンテンツの報告
          </Text>
          {isLogin ? (
            <TopicFlagForm
              topic={topic}
              collectionType={collectionType}
              collectionId={collectionId}
              handleClose={toggleModal}
            />
          ) : (
            <View>
              <Text />
              <Text style={{ color: '#fff' }}>
                報告にはログインが必要です。
              </Text>
              <Text />
              <Button style={{ backgroundColor: gray }} onPress={toggleModal}>
                <Text>了解</Text>
              </Button>
            </View>
          )}
        </View>
      </Modal>
    </React.Fragment>
  );
};

export default TopicFlag;

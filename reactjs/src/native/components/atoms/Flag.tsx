import React, { useState } from 'react';

import { Text, View, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native';
import { brandGray as gray, brandDark as black } from '~/lib/theme';

import FlagForm from '~/native/containers/FlagFormContainer';

const Flag = (props: any) => {
  const {
    isLogin,
    topic,
    challenge,
    category,
    profile,
    collectionType,
    collectionId
  } = props;

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <React.Fragment>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
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
              <FlagForm
                topic={topic}
                challenge={challenge}
                category={category}
                profile={profile}
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
      </View>
    </React.Fragment>
  );
};

export default Flag;

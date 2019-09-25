import React, { useState } from 'react';
import { View, Button, Text } from 'native-base';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native';
import {
  ChallengeObjectiveWhatCard,
  ChallengeObjectiveWishCard
} from './ChallengeObjectiveCard';
import ChallengeObjectiveForm from './ChallengeObjectiveForm';
import { successToastWithNoRedirect } from '../../atoms/Toast';
import { brandGray } from '~/lib/theme';

const ChallengeObjective = (props: any) => {
  const {
    challenge,
    user,
    isMyProfile,
    handleSave,
    objective,
    isLoaded
  } = props;

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const ChallengeObjectiveFormButton = (props: any) => {
    if (!isMyProfile) {
      return null;
    }

    return (
      <Button onPress={toggleModal}>
        <Text>編集</Text>
      </Button>
    );
  };

  const saveHandler = (what: any, wish: any) => () =>
    handleSave({ what, wish })
      .then(() => successToastWithNoRedirect('目標を更新しました。'))
      .then(() => toggleModal());

  const cancelHandler = () => toggleModal();

  const initialWhat = `${challenge.title}に毎日取り組みます！`;
  const what = isLoaded && objective ? objective.what : initialWhat;
  const wish = isLoaded && objective ? objective.wish : '';

  return (
    <React.Fragment>
      {!isLoaded && null}
      {isLoaded && (
        <React.Fragment>
          <TouchableOpacity>
            <View>
              <ChallengeObjectiveWhatCard text={what} />
              <Text />
              {!!wish && <ChallengeObjectiveWishCard text={wish} user={user} />}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <ChallengeObjectiveFormButton />
            </View>
          </TouchableOpacity>
          {isMyProfile && (
            <React.Fragment>
              <Text />
              <Text style={{ fontSize: 14, color: brandGray }}>
                筋トレ３０日チャレンジを通じて達成したいことを書きます。
                定量的(計測可能、数値)目標、自分でコントロール可能な目標を記入してください。
                ここに書いたことはゴールボードでみんなと共有されます。
              </Text>
              <Text />
              <Text style={{ fontSize: 14, color: brandGray }}>
                なにをやるのかの入力欄に一言で目標を書いてください。(60字以内)
                なぜやるのかの入力欄に目標に取り組む理由を詳しく書いてください。
              </Text>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
      {isLoaded && (
        <Modal isVisible={modal} avoidKeyboard>
          <ChallengeObjectiveForm
            inputWhat={what}
            inputWish={wish}
            saveHandler={saveHandler}
            cancelHandler={cancelHandler}
            isLoaded={isLoaded}
          />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default ChallengeObjective;

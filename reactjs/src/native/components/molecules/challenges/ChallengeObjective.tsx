import React, { useState } from 'react';
import { View, Button, Text } from 'native-base';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native';
import {
  ChallengeObjectiveWhatCard,
  ChallengeObjectiveWhyCard
} from './ChallengeObjectiveCard';
import ChallengeObjectiveForm from './ChallengeObjectiveForm';
import { successToastWithNoRedirect } from '../../atoms/Toast';

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

  const saveHandler = (what: any, why: any) => () =>
    handleSave({ what, why })
      .then(() => successToastWithNoRedirect('目標を更新しました。'))
      .then(() => toggleModal());

  const cancelHandler = () => toggleModal();

  const initialWhat = `${challenge.title}に毎日取り組みます！`;
  const what = isLoaded && objective ? objective.what : initialWhat;
  const why = isLoaded && objective ? objective.why : '';

  return (
    <React.Fragment>
      {!isLoaded && null}
      {isLoaded && (
        <TouchableOpacity>
          <View>
            <ChallengeObjectiveWhatCard text={what} />
            <Text />
            {!!why && <ChallengeObjectiveWhyCard text={why} user={user} />}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <ChallengeObjectiveFormButton />
          </View>
        </TouchableOpacity>
      )}
      {isLoaded && (
        <Modal isVisible={modal} avoidKeyboard>
          <ChallengeObjectiveForm
            inputWhat={what}
            inputWhy={why}
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

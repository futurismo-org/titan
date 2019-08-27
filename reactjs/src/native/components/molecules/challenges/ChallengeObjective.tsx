import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Text, Label, Input, Textarea } from 'native-base';
import Modalize from 'react-native-modalize';
import { TouchableOpacity } from 'react-native';
import {
  ChallengeObjectiveWhatCard,
  ChallengeObjectiveWhyCard
} from './ChallengeObjectiveCard';
import ChallengeObjectiveForm from './ChallengeObjectiveForm';

const ChallengeObjective = (props: any) => {
  const {
    challenge,
    user,
    isMyProfile,
    handleSave,
    objective,
    isLoaded
  } = props;

  const modalRef = useRef<Modalize>(null);

  const onOpen = () => {
    const modal = modalRef.current;

    if (modal) {
      modal.open();
    }
  };

  const onClose = () => {
    const modal = modalRef.current;

    if (modal) {
      modal.close();
    }
  };

  const ChallengeObjectiveFormButton = (props: any) => {
    if (!isMyProfile) {
      return null;
    }

    return (
      <Button onPress={onOpen}>
        <Text>編集</Text>
      </Button>
    );
  };

  const handleClose = (what: any, why: any) => () =>
    handleSave({ what, why }).then(() => onClose());

  const initialWhat = `${challenge.title}に毎日取り組みます！`;
  const what = isLoaded && objective ? objective.what : initialWhat;
  const why = isLoaded && objective ? objective.why : '';

  return (
    <React.Fragment>
      {!isLoaded && null}
      {isLoaded && !!objective && (
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
      {isLoaded && !!objective && (
        <Modalize
          ref={modalRef}
          adjustToContentHeight
          keyboardAvoidingBehavior="padding"
        >
          <ChallengeObjectiveForm
            inputWhat={what}
            inputWhy={why}
            closeHandler={handleClose}
            isLoaded={isLoaded}
          />
        </Modalize>
      )}
    </React.Fragment>
  );
};

export default ChallengeObjective;

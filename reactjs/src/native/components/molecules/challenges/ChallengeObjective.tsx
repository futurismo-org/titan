import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Text, Label, Input, Textarea } from 'native-base';
import Modalize from 'react-native-modalize';
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

  const initialWhat = `${challenge.title}に毎日取り組みます！`;

  const [what, setWhat] = useState(initialWhat);
  const [why, setWhy] = useState('');

  useEffect(() => {
    if (isLoaded) {
      setWhat(objective.what);
      setWhy(objective.why);
    } else {
      setWhat(initialWhat);
      setWhy('');
    }
  }, [initialWhat, isLoaded, objective]);

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

  //       ? () => handleSave({ what, why }).then(() => onClose())

  return (
    <React.Fragment>
      {!isLoaded && null}
      {isLoaded && !!objective && (
        <React.Fragment>
          <Modalize ref={modalRef}>
            <ChallengeObjectiveForm
              what={what}
              why={why}
              closeHandler={onClose}
            />
          </Modalize>
          <View>
            <View>
              <ChallengeObjectiveWhatCard text={what} />
              {!!why && <ChallengeObjectiveWhyCard text={why} user={user} />}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <ChallengeObjectiveFormButton />
            </View>
          </View>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ChallengeObjective;

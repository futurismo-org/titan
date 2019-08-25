import React, { useState, useEffect } from 'react';
import { View } from 'native-base';
import {
  ChallengeObjectiveWhatCard,
  ChallengeObjectiveWhyCard
} from './ChallengeObjectiveCard';

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
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setWhat(objective.what);
      setWhy(objective.why);
    } else {
      setWhat(initialWhat);
      setWhy('');
    }
  }, [initialWhat, isLoaded, objective]);

  const onWhatChange = (e: any) => {
    e.preventDefault();
    setWhat(e.target.value);
  };

  const onWhyChange = (e: any) => {
    e.preventDefault();
    setWhy(e.target.value);
  };

  return (
    <React.Fragment>
      {!isLoaded && null}
      {isLoaded && !!objective && (
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <ChallengeObjectiveWhatCard text={what} />
          {!!why && <ChallengeObjectiveWhyCard text={why} user={user} />}
        </View>
      )}
    </React.Fragment>
  );
};

export default ChallengeObjective;

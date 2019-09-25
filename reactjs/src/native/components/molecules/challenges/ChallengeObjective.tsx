import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { withRouter } from 'react-router-native';
import Progress from '~/native/components/atoms/CircularProgress';
import {
  ChallengeObjectiveWOOPCard,
  ChallengeObjectiveWhatCard
} from '~/native/components/molecules/challenges/ChallengeObjectiveCard';

const ChallengeObjective = (props: any) => {
  const {
    challenge,
    isMyProfile,
    objective,
    isLoaded,
    editPath,
    history
  } = props;

  const initialWhat = `${challenge.title}に毎日取り組みます！`;

  const [what, setWhat] = useState(initialWhat);
  const [wish, setWish] = useState('');
  const [outcome, setOutcome] = useState('');
  const [obstacle, setObstacle] = useState('');
  const [plan, setPlan] = useState('');

  useEffect(() => {
    if (isLoaded) {
      setWhat(objective.what ? objective.what : '');
      setWish(objective.wish ? objective.wish : '');
      setOutcome(objective.outcome ? objective.outcome : '');
      setObstacle(objective.obstacle ? objective.obstacle : '');
      setPlan(objective.plan ? objective.plan : '');
    } else {
      setWhat(initialWhat);
    }
  }, [initialWhat, isLoaded, objective]);

  const ChallengeObjectiveFormButton = (props: any) => {
    if (!isMyProfile) {
      return null;
    }

    return (
      <Button onPress={() => history.push(editPath)}>
        <Text>編集</Text>
      </Button>
    );
  };

  return (
    <React.Fragment>
      {!isLoaded && <Progress />}
      {isLoaded && (
        <React.Fragment>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginBottom: 20
              }}
            >
              <ChallengeObjectiveFormButton />
            </View>
            <View>
              <ChallengeObjectiveWhatCard text={what} />
              <Text />
              <ChallengeObjectiveWOOPCard
                wish={wish}
                outcome={outcome}
                obstacle={obstacle}
                plan={plan}
              />
            </View>
          </TouchableOpacity>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default withRouter(ChallengeObjective);

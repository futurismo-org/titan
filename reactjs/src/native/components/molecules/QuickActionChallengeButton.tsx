import React from 'react';
import { Text, Col, Button } from 'native-base';
import { withRouter } from 'react-router-native';
import { useDocument } from 'react-firebase-hooks/firestore';
import { isPostPossible } from '~/lib/challenge';
import Error from '../atoms/Error';

const QuickActionChallengeButton = (props: any) => {
  const {
    recordHandler,
    resetHandler,
    history,
    showGiphy,
    participantsRef
  } = props;

  const [value, loading, error] = useDocument(participantsRef);

  const writeRecord = recordHandler(null, history.push, () => showGiphy('win'));
  const resetRecord = resetHandler(history.push, () => showGiphy('lose'));

  const challenge = value && value.data();
  const recordDisabled = !isPostPossible(challenge && challenge.histories);

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {!loading && challenge && (
        <React.Fragment>
          <Col>
            <Button
              full
              success
              onPress={() => writeRecord(challenge)}
              disabled={recordDisabled}
            >
              <Text>記録する</Text>
            </Button>
          </Col>
          <Col>
            <Button full warning onPress={() => resetRecord(challenge)}>
              <Text>リセット</Text>
            </Button>
          </Col>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default withRouter(QuickActionChallengeButton);

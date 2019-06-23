import * as React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import Navbar from '../molecules/challenges/ChallengeNavbar';
import Header from '../molecules/challenges/ChallengeHeader';
import Body from '../molecules/challenges/ChallengeBody';

import Paper from '../templates/PaperWrapper';

import Progress from '../atoms/CircularProgress';

import firebase from '../../lib/firebase';

const Challenge = (props: any) => {
  const [value, loading, error] = useDocument(
    firebase
      .firestore()
      .collection('challenges')
      .doc(props.match.params.id)
  );

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {value && (
        <React.Fragment>
          <Header challenge={value.data()} />
          <Paper>
            <Navbar id={value.id} />
            <Body challenge={value.data()} />
          </Paper>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Challenge;

import Paper from '@material-ui/core/Paper';
import * as React from 'react';
import styled from 'styled-components';
import { useDocument } from 'react-firebase-hooks/firestore';
import theme from '../../lib/theme';
import Navbar from '../molecules/challenges/ChallengeNavbar';
import Header from '../molecules/challenges/ChallengeHeader';
import Body from '../molecules/challenges/ChallengeBody';

import Progress from '../atoms/CircularProgress';

import firebase from '../../lib/firebase';

const StyledPaper = styled(Paper as React.SFC)`
  padding: ${theme.spacing(3, 2)};
`;

interface Props {
  match: {
    params: {
      id?: string;
    };
  };
}

const Challenge = (props: Props) => {
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
          <StyledPaper>
            <Navbar id={value.id} />
            <Body challenge={value.data()} />
          </StyledPaper>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Challenge;

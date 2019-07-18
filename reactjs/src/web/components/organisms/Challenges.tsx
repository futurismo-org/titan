import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { useCollection } from 'react-firebase-hooks/firestore';
import moment from 'moment';
import firebase from 'lib/firebase';
import theme from 'lib/theme';
import ChallengeCard from '../atoms/challenges/ChallengeCard';

import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';
import Paper from '../templates/PaperWrapper';

interface Props {
  container?: any;
  spacing?: number;
}

const StyledCardGrid = styled(Grid as React.SFC<Props>)`
  && {
    margin-top: ${theme.spacing(3)}px;
  }
`;

const Challenges = () => {
  const [value, loading, error] = useCollection(
    firebase.firestore().collection('challenges')
  );

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      <Paper>
        <Title text="開催中のチャレンジ" />
        {value && (
          <StyledCardGrid container spacing={4}>
            {value!.docs
              .filter(
                (doc: any) =>
                  moment(new Date().setHours(0, 0, 0, 0)).isBefore(
                    doc.data().closedAt.toDate()
                  ) &&
                  moment(new Date().setHours(0, 0, 0, 1)).isAfter(
                    doc.data().openedAt.toDate()
                  )
              )
              .map((doc: any) => (
                <ChallengeCard challenge={doc.data()} key={doc.id} />
              ))}
          </StyledCardGrid>
        )}
      </Paper>
      <Paper>
        <Title text="開催前のチャレンジ" />
        {value && (
          <StyledCardGrid container spacing={4}>
            {value!.docs
              .filter((doc: any) =>
                moment(new Date().setHours(0, 0, 0, 0)).isBefore(
                  doc.data().openedAt.toDate()
                )
              )
              .map((doc: any) => (
                <ChallengeCard challenge={doc.data()} key={doc.id} />
              ))}
          </StyledCardGrid>
        )}
      </Paper>
      <Paper>
        <Title text="開催終了のチャレンジ" />
        {value && (
          <StyledCardGrid container spacing={4}>
            {value!.docs
              .filter((doc: any) =>
                moment(new Date().setHours(0, 0, 0, 0)).isAfter(
                  doc.data().closedAt.toDate()
                )
              )
              .map((doc: any) => (
                <ChallengeCard challenge={doc.data()} key={doc.id} />
              ))}
          </StyledCardGrid>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default Challenges;

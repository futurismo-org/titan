import * as React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { useDocument } from 'react-firebase-hooks/firestore';
import firebase from '../../../lib/firebase';

import Record from './ChallengePostRecord';
import ChallengeGrass from './ChallengeGrass';

import Progress from '../../atoms/CircularProgress';
import Paper from '../../templates/PaperWrapper';
import Title from '../../atoms/Title';

const ChallengeUserDashBoard = (props: any) => {
  const { userId, challengeId, openedAt, closedAt } = props;

  const resourceId = `challenges/${challengeId}/participants/${userId}`;

  const [value, loading, error] = useDocument(
    firebase.firestore().doc(resourceId)
  );

  const now = new Date();
  const isDaysValid = (days: number) => {
    return days !== undefined && days !== null && !isNaN(days);
  };

  const formatDays = (days: any) => {
    if (!isDaysValid(days)) {
      return 0;
    }
    return days;
  };

  const formatDate = (props: any): string => {
    const { days, startDate } = props;
    if (
      !isDaysValid(days) ||
      days === 0 ||
      startDate === undefined ||
      startDate === null
    ) {
      return 'なし';
    }
    return moment(startDate.toDate()).format('YYYY年MM月DD日 HH:mm');
  };

  const data = value && value.data();

  return (
    <Paper>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {data && (
        <Paper>
          <Title text="xxxさんの記録" />
          <Record days={formatDays(data.days)} />
          <h3>開始日: {formatDate(data)}</h3>
          <ChallengeGrass data={data} openedAt={openedAt} closedAt={closedAt} />
        </Paper>
      )}
    </Paper>
  );
};

const mapStateToProps = (state: any, props: any) => ({
  challengeId: props.match.params.challengeId,
  userId: props.match.params.challengeId,
  ...props
});

export default connect(mapStateToProps)(ChallengeUserDashBoard);

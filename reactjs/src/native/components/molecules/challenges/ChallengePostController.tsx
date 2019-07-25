import * as React from 'react';
import { Button, Text } from 'native-base';
import moment, { now, nowMoment } from '~/lib/moment';
import firebase from '~/lib/firebase';

import { getUserDashboardPath, withDomain } from '~/lib/url';
import { getParticipantsUserId } from '~/lib/resource';

import { isChallengeOpening, isDaysValid } from '~/lib/challenge';

const ChallengePostController = (props: any) => {
  const { challenge, participant } = props;
  const { webhookURL, openedAt, closedAt, id } = challenge;

  const challengeId = id;
  const userShortId = participant.id;
  const resourceId = getParticipantsUserId(challengeId, userShortId);

  const writeRecord = (props: any) => {
    const {
      days,
      score,
      accDays,
      maxDays,
      pastDays,
      histories,
      displayName
    } = props;

    if (
      histories.length > 0 &&
      histories.filter(
        (history: any) =>
          history.type === 'RECORD' &&
          moment(history.timestamp.toDate()).isSame(moment(now), 'days')
      ).length !== 0
    ) {
      window.alert('記録の投稿は1日1回までです。'); // eslint-disable-line
      return;
    }

    const tomorrow = !isDaysValid(days) ? 1 : days + 1;
    const newPastDays = !isDaysValid ? undefined : pastDays + 1;
    const newScore = score + 1;
    const newAccDays = !isDaysValid(accDays) ? 1 : accDays + 1;
    const newMaxDays = tomorrow > maxDays ? tomorrow : maxDays;

    const newHistory = {
      id: histories.length + 1,
      timestamp: new Date(),
      score: newScore,
      days: tomorrow,
      accDays: newAccDays,
      pastDays: newPastDays,
      diff: moment().diff(moment(openedAt.toDate()), 'days'),
      type: 'RECORD'
    };

    const updateData: any = {
      days: tomorrow,
      score: newScore,
      accDays: newAccDays,
      pastDays: newPastDays,
      maxDays: newMaxDays,
      startedAt: now,
      updatedAt: now,
      histories: firebase.firestore.FieldValue.arrayUnion(newHistory)
    };

    if (!isDaysValid(days)) updateData.startedAt = now;

    firebase
      .firestore()
      .doc(resourceId)
      .update(updateData)
      .then(() => {
        window.alert('投稿が完了しました。'); // eslint-disable-line
      });
    // .then(() => push(getUserDashboardPath(challengeId, userShortId)))
  };

  const resetRecord = (props: any) => {
    const { score, histories, displayName } = props;

    const newScore = score - 3;

    const newHistory = {
      id: histories.length + 1,
      timestamp: now,
      score: newScore,
      days: 0,
      pastDays: 0,
      diff: nowMoment.diff(moment(openedAt), 'days'),
      type: 'RESET'
    };

    const resetData = {
      startedAt: null,
      updatedAt: now,
      days: 0,
      pastDays: 0,
      score: newScore,
      histories: firebase.firestore.FieldValue.arrayUnion(newHistory)
    };

    firebase
      .firestore()
      .doc(resourceId)
      .update(resetData);
    //       .then(() => {
    //         const url = withDomain(getUserDashboardPath(challengeId, userShortId));
    //         const message = `${displayName}さんがリセットしました。
    // ${url}`;
    //         postMessage(webhookURL, message);
    //       })
    // .then(() => push(getUserDashboardPath(challengeId, userShortId)))
  };

  const confirm = (props: any) => {
    const { days } = props;
    if (!isDaysValid(days)) return;

    /* eslint-disable */
    if (window.confirm('本当にリセットしますか？')) {
      resetRecord(props);
    }
    /* eslint-enable */
  };

  return (
    <React.Fragment>
      {isChallengeOpening(openedAt.toDate(), closedAt.toDate()) ? (
        <React.Fragment>
          <Button
            success
            small
            rounded
            onPress={() => writeRecord(participant)}
          >
            <Text>記録する</Text>
          </Button>
          <Button warning small rounded onPress={() => confirm(participant)}>
            <Text>リセット</Text>
          </Button>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

export default ChallengePostController;

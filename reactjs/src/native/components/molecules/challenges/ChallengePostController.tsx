import React, { useState } from 'react';
import { Button, Text } from 'native-base';
import AlertPro from 'react-native-alert-pro';
import { withRouter } from 'react-router-native';
import shortId from 'shortid';
import moment, { now, nowMoment } from '~/lib/moment';
import firebase from '~/lib/firebase';

import { postMessage } from '~/lib/discord.client.api';
import { getUserDashboardPath } from '~/lib/url';

import { isChallengeOpening, isDaysValid } from '~/lib/challenge';
import { errorToast } from '../../atoms/Toast';

const ChallengePostController = (props: any) => {
  const {
    challenge,
    participant,
    resourceId,
    history,
    redirectPath,
    showGiphy
  } = props;

  const { openedAt, closedAt } = challenge;

  const [alert, setAlert] = useState();

  const writeRecord = (props: any) => {
    const { days, score, accDays, maxDays, pastDays, histories } = props;

    if (
      histories.length > 0 &&
      histories.filter(
        (history: any) =>
          history.type === 'RECORD' &&
          moment(history.timestamp.toDate()).isSame(nowMoment, 'days')
      ).length !== 0
    ) {
      errorToast('記録の投稿は1日1回までです');
      return;
    }

    const tomorrow = !isDaysValid(days) ? 1 : days + 1;
    const newPastDays = !isDaysValid(pastDays) ? 1 : pastDays + 1;
    const newScore = score + 1;
    const newAccDays = !isDaysValid(accDays) ? 1 : accDays + 1;
    const newMaxDays = tomorrow > maxDays ? tomorrow : maxDays;

    const newHistory = {
      id: shortId.generate(),
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
      .then(() => showGiphy('win'))
      .then(() => {
        const url = `https://titan-fire.com${getUserDashboardPath(
          challenge.id,
          participant.id
        )}`;
        const message = `${participant.displayName}さんが計${newAccDays}日達成しました！
${url}`;
        postMessage(challenge.webhookURL, message);
      })
      // .then(() => {
      //   successToastWithNoRedirect('投稿が完了しました');
      // })
      .then(() => history.push(redirectPath));
  };

  const resetRecord = (props: any) => {
    const { score, histories, accDays } = props;

    const newScore = score - 3;

    const newHistory = {
      id: shortId.generate(),
      timestamp: now,
      score: newScore,
      days: 0,
      pastDays: 0,
      accDays,
      diff: nowMoment.diff(moment(openedAt.toDate()), 'days'),
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
      .update(resetData)
      .then(() => showGiphy('lose'))
      // .then(() => {
      //   successToastWithNoRedirect('リセットしました');
      // })
      .then(() => {
        const url = `https://titan-fire.com${getUserDashboardPath(
          challenge.id,
          participant.id
        )}`;
        const message = `${participant.displayName}さんがリセットしました。
    ${url}`;
        postMessage(challenge.webhookURL, message);
      })
      .then(() =>
        history.push(getUserDashboardPath(challenge.id, participant.id))
      );
  };

  return (
    <React.Fragment>
      <AlertPro
        ref={(ref: any) => setAlert(ref)}
        onConfirm={() => {
          resetRecord(participant);
          alert.close();
        }}
        onCancel={() => alert.close()}
        title="リセットの確認"
        message="本当に記録をリセットしますか？"
        textCancel="キャンセル"
        textConfirm="リセット"
      />
      {isChallengeOpening(openedAt.toDate(), closedAt.toDate()) ? (
        <React.Fragment>
          <Button
            style={{ margin: 2 }}
            success
            onPress={() => writeRecord(participant)}
          >
            <Text>記録する</Text>
          </Button>
          <Button warning style={{ margin: 2 }} onPress={() => alert.open()}>
            <Text>リセット</Text>
          </Button>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

export default withRouter(ChallengePostController);

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import shortId from 'shortid';
import { isDaysValid, RECORD, RESET } from '~/lib/challenge';

import moment, { now, isToday } from '~/lib/moment';
import { getParticipantsUserId } from '~/lib/resource';
import { getUserDashboardPath } from '~/lib/url';

import { postMessage } from '~/lib/discord.client.api';

import firebase from '~/lib/firebase';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const { userShortId, challenge } = props;
  const { webhookURL, openedAt, closedAt, id } = challenge;

  const challengeId = id;
  const resourceId = getParticipantsUserId(challengeId, userShortId);

  const dashBoardPath = getUserDashboardPath(challengeId, userShortId);
  const dashBoardURL = `https://titan-fire.com${dashBoardPath}`;

  const recordHandler = (alert: any, redirect: any, reload: any) => (
    props: any
  ) => {
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
      histories.filter((history: any) => isToday(history.timestamp.toDate()))
        .length !== 0
    ) {
      alert('記録の投稿は1日1回までです。');
      return;
    }

    const tomorrow = !isDaysValid(days) ? 1 : days + 1;
    const newPastDays = !isDaysValid(pastDays) ? 1 : pastDays + 1;
    const newScore = score + 1;
    const newAccDays = !isDaysValid(accDays) ? 1 : accDays + 1;
    const newMaxDays = tomorrow > maxDays ? tomorrow : maxDays;

    const newHistory = {
      id: shortId.generate(),
      timestamp: now,
      score: newScore,
      days: tomorrow,
      accDays: newAccDays,
      pastDays: newPastDays,
      diff: moment().diff(moment(openedAt.toDate()), 'days'),
      type: RECORD
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
        const message = `${displayName}さんが計${newAccDays}日達成しました！
${dashBoardURL}`;
        postMessage(webhookURL, message);
      })
      .then(() => alert('投稿が完了しました。'))
      .then(() => {
        redirect && redirect('/');
        redirect && redirect(dashBoardPath);
        reload && reload();
      });
  };

  const resetHandler = (redirect: any, reload: any) => (props: any) => {
    const { score, displayName, accDays, histories } = props;

    const newScore = score - 3;

    const lastHistory = histories[histories.length - 1];
    const newAccDays =
      isToday(lastHistory.timestamp.toDate()) && lastHistory.type === RECORD
        ? accDays - 1
        : accDays;

    const newHistory = {
      id: shortId.generate(),
      timestamp: now,
      score: newScore,
      days: 0,
      pastDays: 0,
      accDays: newAccDays,
      diff: moment().diff(moment(openedAt.toDate()), 'days'),
      type: RESET
    };

    const resetData = {
      startedAt: null,
      updatedAt: now,
      days: 0,
      pastDays: 0,
      score: newScore,
      accDays: newAccDays,
      histories: firebase.firestore.FieldValue.arrayUnion(newHistory)
    };

    firebase
      .firestore()
      .doc(resourceId)
      .update(resetData)
      .then(() => {
        const message = `${displayName}さんがリセットしました。
${dashBoardURL}`;
        postMessage(webhookURL, message);
      })
      .then(() => {
        redirect && redirect('/');
        redirect && redirect(dashBoardPath);
        reload && reload();
      });
  };

  const hide = !(
    moment(now).diff(moment(openedAt.toDate())) >= 0 &&
    moment(now).diff(moment(closedAt.toDate())) < 0
  );

  const participantsRef = firebase.firestore().doc(resourceId);

  return {
    recordHandler,
    resetHandler,
    participantsRef,
    hide,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import shortId from 'shortid';
import {
  isDaysValid,
  RECORD,
  RESET,
  isChallengeOpening,
  getCategoryId,
  isPostPossible
} from '~/lib/challenge';

import moment, { now, isToday } from '~/lib/moment';
import { getParticipantsUserId } from '~/lib/resource';
import { getChallengeDashboardPath } from '~/lib/url';
import { mergeCategory } from '~/lib/profile';

import { postMessage } from '~/lib/discord.client.api';
import { showGiphy } from '~/actions/giphyAction';

import firebase from '~/lib/firebase';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ showGiphy }, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const { userShortId, challenge } = props;
  const { webhookURL, openedAt, closedAt, id } = challenge;

  const challengeId = id;
  const resourceId = getParticipantsUserId(challengeId, userShortId);

  const dashBoardPath = getChallengeDashboardPath(challengeId, userShortId);
  const dashBoardURL = `https://titan-fire.com${dashBoardPath}`;

  const recordHandler = (alert: any, redirect: any, gifty: any) => (
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

    if (!isPostPossible(histories)) {
      alert && alert('記録の投稿は1日1回までです。');
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
      challengeId,
      challengeTitle: challenge.title,
      type: RECORD
    };

    const updateData: any = {
      days: tomorrow,
      score: newScore,
      accDays: newAccDays,
      pastDays: newPastDays,
      maxDays: newMaxDays,
      updatedAt: now,
      histories: firebase.firestore.FieldValue.arrayUnion(newHistory)
    };

    if (!isDaysValid(days)) updateData.startedAt = now;

    firebase
      .firestore()
      .doc(resourceId)
      .update(updateData)
      .then(() => gifty && gifty())
      .then(() => {
        const message = `${displayName}さんが計${newAccDays}日達成しました！
${dashBoardURL}`;
        webhookURL && postMessage(webhookURL, message);
      })
      .then(() => alert && alert('投稿が完了しました。'))
      .then(() => {
        redirect && redirect('/');
        redirect && redirect(dashBoardPath);
      });

    // profiles テーブルも更新
    const categoryId = getCategoryId(challenge.categoryRef);
    firebase
      .firestore()
      .collection('profiles')
      .doc(userShortId)
      .collection('categories')
      .doc(categoryId)
      .get()
      .then(doc => doc.data())
      .then((currentCategory: any) => {
        const updateProfileCategoryData = mergeCategory(
          currentCategory,
          updateData
        );

        return updateProfileCategoryData;
      })
      .then(data => {
        const categoryRef = firebase
          .firestore()
          .collection('profiles')
          .doc(userShortId)
          .collection('categories')
          .doc(categoryId);

        categoryRef.set(data, { merge: true });
        categoryRef
          .collection('histories')
          .doc(newHistory.id)
          .set(newHistory);
      });
  };

  const resetHandler = (redirect: any, gifty: any) => (props: any) => {
    const { score, displayName, accDays, histories } = props;

    const newScore = score - 3;

    const lastHistory = histories[histories.length - 1];

    const newAccDays =
      lastHistory &&
      isToday(lastHistory.timestamp.toDate()) &&
      lastHistory.type === RECORD
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
      challengeId,
      challengeTitle: challenge.title,
      type: RESET
    };

    const resetData = {
      startedAt: null,
      updatedAt: now,
      days: 0,
      pastDays: 0,
      score: newScore,
      accDays: newAccDays,
      lastResetDate: now,
      histories: firebase.firestore.FieldValue.arrayUnion(newHistory)
    };

    firebase
      .firestore()
      .doc(resourceId)
      .update(resetData)
      .then(() => gifty && gifty())
      .then(() => {
        const message = `${displayName}さんがリセットしました。
${dashBoardURL}`;
        webhookURL && postMessage(webhookURL, message);
      })
      .then(() => {
        redirect && redirect('/');
        redirect && redirect(dashBoardPath);
      });

    // profiles テーブルも更新
    const categoryId = getCategoryId(challenge.categoryRef);
    firebase
      .firestore()
      .collection('profiles')
      .doc(userShortId)
      .collection('categories')
      .doc(categoryId)
      .get()
      .then(doc => doc.data())
      .then((currentCategory: any) => {
        const updateProfileCategoryData = mergeCategory(
          currentCategory,
          resetData
        );

        return updateProfileCategoryData;
      })
      .then(data => {
        const categoryRef = firebase
          .firestore()
          .collection('profiles')
          .doc(userShortId)
          .collection('categories')
          .doc(categoryId);

        categoryRef.set(data, { merge: true });
        categoryRef
          .collection('histories')
          .doc(newHistory.id)
          .set(newHistory);
      });
  };

  const hide =
    openedAt &&
    closedAt &&
    !isChallengeOpening(openedAt.toDate(), closedAt.toDate());

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

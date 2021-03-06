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

import moment, { isToday } from '~/lib/moment';
import { getParticipantId } from '~/lib/resource';
import { getChallengeDashboardPath } from '~/lib/url';
import { mergeCategory } from '~/lib/profile';

import { postMessage } from '~/lib/discord.client.api';
import { showGiphy } from '~/actions/giphyAction';

import firebase from '~/lib/firebase';
import { POST_TYPE_RECORD, POST_TYPE_RESET } from '~/constants/post';
import { postUserChallengeHistory } from '~/lib/getstream';
import {
  RECORD_STRATEGY_MULTI,
  RECORD_STRATEGY_SIMPLE,
  RECORD_OPTION_TIME
} from '~/constants/strategy';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ showGiphy }, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const { userShortId, challenge } = props;
  const { webhookURL, openedAt, closedAt, id } = challenge;

  const challengeId = id;
  const resourceId = getParticipantId(challengeId, userShortId);

  const dashBoardPath = getChallengeDashboardPath(challengeId, userShortId);
  const dashBoardURL = `https://titan-fire.com${dashBoardPath}`;

  const profile = state.firebase.profile;

  const recordHandler = (
    alert: any,
    redirect: any,
    gifty: any,
    closeHandler: any
  ) => (props: any) => {
    const {
      days,
      score,
      accDays,
      maxDays,
      pastDays,
      histories,
      displayName,
      minutes
    } = props;

    if (!isPostPossible(histories, challenge.recordStrategy)) {
      alert && alert('記録の投稿は1日1回までです。');
      return;
    }

    let tomorrow: number;
    let newScore: number;
    let newPastDays: number;
    let newAccDays: number;

    if (challenge.recordStrategy === RECORD_STRATEGY_MULTI) {
      if (
        histories.filter((history: any) => isToday(history.timestamp.toDate()))
          .length === 0
      ) {
        tomorrow = !isDaysValid(days) ? 1 : days + 1;
        newPastDays = !isDaysValid(pastDays) ? 1 : pastDays + 1;
        newScore = score + 1;
        newAccDays = !isDaysValid(accDays) ? 1 : accDays + 1;
      } else if (
        histories.filter((history: any) => isToday(history.timestamp.toDate()))
          .length < challenge.postLimitPerDay
      ) {
        newScore = score + 1;
        tomorrow = !isDaysValid(days) ? 1 : days;
        newPastDays = !isDaysValid(pastDays) ? 1 : pastDays;
        newAccDays = !isDaysValid(accDays) ? 1 : accDays;
      } else {
        newScore = score;
        tomorrow = !isDaysValid(days) ? 1 : days;
        newPastDays = !isDaysValid(pastDays) ? 1 : pastDays;
        newAccDays = !isDaysValid(accDays) ? 1 : accDays;
      }
    } else {
      tomorrow = !isDaysValid(days) ? 1 : days + 1;
      newPastDays = !isDaysValid(pastDays) ? 1 : pastDays + 1;
      newScore = score + 1;
      newAccDays = !isDaysValid(accDays) ? 1 : accDays + 1;
    }

    const newMaxDays = tomorrow > maxDays ? tomorrow : maxDays;
    const historyId = shortId.generate();

    const newHistory = {
      id: historyId,
      timestamp: new Date(),
      score: newScore,
      days: tomorrow,
      accDays: newAccDays,
      pastDays: newPastDays,
      diff: moment().diff(moment(openedAt.toDate()), 'days'),
      challengeId,
      challengeTitle: challenge.title,
      type: RECORD
    };

    if (challenge.recordOption === RECORD_OPTION_TIME) {
      Object.assign(newHistory, { minutes });
    }

    const updateData: any = {
      days: tomorrow,
      score: newScore,
      accDays: newAccDays,
      pastDays: newPastDays,
      maxDays: newMaxDays,
      updatedAt: new Date(),
      histories: firebase.firestore.FieldValue.arrayUnion(newHistory)
    };

    if (!isDaysValid(days)) updateData.restartedAt = new Date();

    firebase
      .firestore()
      .doc(resourceId)
      .update(updateData)
      .then(() => closeHandler && closeHandler())
      .then(() => gifty && gifty())
      .then(() => {
        const message = `${displayName}さんが計${newAccDays}日達成しました！
${dashBoardURL}`;
        webhookURL && postMessage(webhookURL, message);
      })
      .then(() =>
        postUserChallengeHistory(userShortId, challengeId, {
          historyId,
          user: profile,
          type: POST_TYPE_RECORD,
          days: tomorrow
        })
      )
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

    const historyId = shortId.generate();

    const newHistory = {
      id: historyId,
      timestamp: new Date(),
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
      restartedAt: null,
      updatedAt: new Date(),
      days: 0,
      pastDays: 0,
      score: newScore,
      accDays: newAccDays,
      lastResetDate: new Date(),
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
      .then(() =>
        postUserChallengeHistory(userShortId, challengeId, {
          historyId,
          user: profile,
          type: POST_TYPE_RESET,
          days: 0
        })
      )
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
    resetHandler:
      challenge.recordStrategy === RECORD_STRATEGY_SIMPLE ||
      challenge.recordStrategy === RECORD_STRATEGY_MULTI
        ? null
        : resetHandler,
    participantsRef,
    hide,
    recordStrategy: challenge.recordStrategy,
    recordOption: challenge.recordOption,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);

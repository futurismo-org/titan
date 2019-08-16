import { firestore } from 'firebase';
import moment, { nowMoment } from '~/lib/moment';
import firebase from '~/lib/firebase';

import { mergeCategory } from './profile';

export const RECORD = 'RECORD';
export const RESET = 'RESET';

export const ACC_DAYS = '大会累積日数';
export const PAST_DAYS = '過去連続日数';

export const challengePeriod = (challenge: any) => {
  const openedAt = moment(challenge.openedAt.toDate());
  const closedAt = moment(challenge.closedAt.toDate());
  const today = moment();

  if (openedAt.diff(today, 'days') >= 0) {
    return `${openedAt.fromNow()}に開始`;
  }
  return `${closedAt.fromNow()}に終了`;
};

export const getTotalDays = (
  openedAt: Date,
  closedAt: Date,
  participant: any
) => {
  const today = moment();
  const createdAt = participant.createdAt.toDate();

  if (today.isBefore(openedAt)) {
    return 0;
  }

  if (today.isAfter(closedAt)) {
    if (moment(createdAt).isAfter(moment(openedAt))) {
      return moment(closedAt).diff(createdAt, 'days') + 1;
    }
    return moment(closedAt).diff(openedAt, 'days') + 1;
  }

  return moment(createdAt).isAfter(moment(openedAt))
    ? today.diff(createdAt, 'days') + 1
    : today.diff(openedAt, 'days') + 1;
};

export const getAchieveRate = (totalDays: number, accDays: number) =>
  totalDays === 0 ? 0 : Math.round(((accDays || 0) / totalDays) * 100);

export const isDaysValid = (days: number) => {
  return days !== undefined && days !== null && !isNaN(days);
};

export const formatDays = (days: any) => {
  if (!isDaysValid(days)) {
    return 0;
  }
  return days;
};

export const isChallengeClosed = (closedAt: Date) =>
  moment(new Date().setHours(29, 59, 59, 59)).diff(moment(closedAt), 'days') >
  0;

export const isChallengeOpening = (openedAt: Date, closedAt: Date) =>
  nowMoment.diff(moment(openedAt)) >= 0 && nowMoment.diff(moment(closedAt)) < 0;

export const rankChallengeParticipants = (participants: any) => {
  const users = participants.sort(
    (x: any, y: any) =>
      y.score - x.score ||
      y.days - x.days ||
      y.maxDays - x.maxDays ||
      y.updatedAt.toDate() - x.updatedAt.toDate()
  );

  const size = users.length;

  const isSameScore = (users: any, i: number) =>
    users[i - 1].score === users[i].score &&
    users[i - 1].days === users[i].days &&
    users[i - 1].maxDays === users[i].maxDays;

  const rankings = new Array(size);
  rankings[0] = 1;
  for (let i = 1; i < size; i += 1) {
    rankings[i] = isSameScore(users, i) ? rankings[i - 1] : i + 1;
  }

  const rankedUsers = new Array(size);

  for (let i = 0; i < size; i += 1) {
    rankedUsers[i] = {
      ...users[i],
      rank: rankings[i],
      ratio: ((rankings[i] / rankings.length) * 100).toFixed(1)
    };
  }

  return rankedUsers;
};

export const getCategoryId = (categoryRef: any) =>
  categoryRef.path.split('/')[1];

export const aggregateChallenge = async (challenge: any) => {
  const challengeId = challenge.id;
  const categoryRef = challenge.categoryRef;

  // 参加処理が済んでいない場合は、先に参加処理を走らせる（互換性処理)
  await firebase
    .firestore()
    .runTransaction(async (transaction: firestore.Transaction) => {
      const participantes = await firebase
        .firestore()
        .collection('challenges')
        .doc(challengeId)
        .collection('participants')
        .get()
        .then(snap => snap.docs.map(doc => doc.data()));

      return participantes.map(user => {
        const userShortId = user.id;

        const newChallenge = {
          updatedAt: new Date(),
          title: challenge.title,
          description: challenge.description,
          sensitive: challenge.sensitive ? challenge.sensitive : false,
          challengeId,
          userShortId,
          userDisplayName: user.displayName,
          openedAt: challenge.openedAt,
          closedAt: challenge.closedAt
        };

        const categoryId = getCategoryId(challenge.categoryRef);

        const newCategory = {
          createdAt: new Date(),
          updatedAt: new Date(),
          ref: challenge.categoryRef,
          sensitive: challenge.sensitive ? challenge.sensitive : false, // categoryの値はとれないが、まあchallengeがsensiveなら同じ
          userDisplayName: user.displayName,
          categoryId,
          userShortId
        };

        firebase
          .firestore()
          .collection('profiles')
          .doc(userShortId)
          .collection('challenges')
          .doc(challengeId)
          .set(newChallenge, { merge: true });

        return firebase
          .firestore()
          .collection('profiles')
          .doc(userShortId)
          .collection('categories')
          .doc(categoryId)
          .set(newCategory, { merge: true });
      });
    });
  // ここまで

  await firebase
    .firestore()
    .runTransaction(async (transaction: firestore.Transaction) => {
      const rankedUsers = await firebase
        .firestore()
        .collection('challenges')
        .doc(challengeId)
        .collection('participants')
        .get()
        .then(snap => snap.docs.map(doc => doc.data()))
        .then(participants => rankChallengeParticipants(participants));

      await rankedUsers.map(user =>
        firebase
          .firestore()
          .collection('challenges')
          .doc(challengeId)
          .collection('participants')
          .doc(user.id)
          .set(user)
      );

      const challengeResults = await rankedUsers.map(user => ({
        id: challengeId,
        challengeId,
        userDisplayName: user.displayName,
        userShortId: user.id,
        score: user.score,
        rank: user.rank,
        ratio: user.ratio,
        updatedAt: new Date()
      }));

      const categoryId = getCategoryId(categoryRef);

      await challengeResults.map(data => {
        const userRef = firebase
          .firestore()
          .collection('profiles')
          .doc(data.userShortId);

        userRef.set(
          {
            id: data.userShortId,
            displayName: data.userDisplayName,
            updatedAt: new Date()
          },
          { merge: true }
        );

        return userRef
          .collection('challenges')
          .doc(data.challengeId)
          .set(data, { merge: true });
      });

      const profileCategories = await rankedUsers.map(
        async challengeParticipant => {
          const resourceId = `/profiles/${challengeParticipant.id}/categories/${categoryId}`;

          const currentProfileCategory = await firebase
            .firestore()
            .doc(resourceId)
            .get()
            .then(doc => doc.data());

          const mergedProfileCategory = mergeCategory(
            currentProfileCategory,
            challengeParticipant
          );

          return {
            id: categoryId,
            userShortId: challengeParticipant.id,
            userDisplayName: challengeParticipant.displayName,
            categoryId,
            ref: categoryRef,
            ...mergedProfileCategory,
            updatedAt: new Date()
          };
        }
      );

      const profileCategoryHistories = await rankedUsers.map(
        challengeParticipant => {
          return {
            userShortId: challengeParticipant.id,
            historites: challengeParticipant.histories
          };
        }
      );

      // 通常はchallengeでの投稿時にhistoriesテーブルもupdateされるので、主にデバッグ用。
      profileCategoryHistories.forEach(data => {
        data.historites.forEach((history: any) =>
          firebase
            .firestore()
            .collection('profiles')
            .doc(data.userShortId)
            .collection('categories')
            .doc(categoryId)
            .collection('histories')
            .doc(history.id)
            .set(history, { merge: true })
        );
      });

      profileCategories.forEach(data => {
        data.then(data => {
          const userRef = firebase
            .firestore()
            .collection('profiles')
            .doc(data.userShortId);

          userRef.set(
            {
              id: data.userShortId,
              displayName: data.userDisplayName,
              updatedAt: new Date()
            },
            { merge: true }
          );

          userRef
            .collection('categories')
            .doc(data.categoryId)
            .set(data);
        });
      });
    });

  // 最後に総合スコアの算出
  await firebase
    .firestore()
    .collection('challenges')
    .doc(challengeId)
    .collection('participants')
    .get()
    .then(snap => snap.docs)
    .then(docs => {
      docs.map(async (doc: any) => {
        const userShortId = doc.id;
        const totalScore = await doc.ref
          .collection('challenges')
          .get()
          .then((snap: any) =>
            snap.docs
              .map((doc: any) => doc.data().score)
              .filter((score: any) => score)
              .reduce((x: number, y: number) => {
                return x + y;
              }, 0)
          );

        firebase
          .firestore()
          .collection('profiles')
          .doc(userShortId)
          .update({ id: userShortId, totalScore: totalScore });
      });
    });
};

export const isHideSensitive = (
  debugSensitive: boolean,
  collectionSensitive: boolean,
  userSettingSenstivie: boolean
) => {
  return !debugSensitive && (collectionSensitive && !userSettingSenstivie);
};

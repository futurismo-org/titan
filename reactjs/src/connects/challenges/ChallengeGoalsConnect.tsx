import { connect } from 'react-redux';
import moment from '~/lib/moment';

import firebase from '~/lib/firebase';

const mapStateToProps = (state: any, props: any) => {
  const challengeId = props.challengeId;

  const fetchGoals = async () => {
    const firestore = firebase.firestore();
    const resourceId = `/challenges/${challengeId}/participants`;

    const users = await firestore
      .collection(resourceId)
      .get()
      .then(snap => snap.docs.map(doc => doc.data()));

    const promises = await users.map((user: any) => {
      const userShortId = user.id;
      return firebase
        .firestore()
        .collection('objectives')
        .doc(userShortId)
        .collection('challenges')
        .doc(challengeId)
        .get()
        .then((doc: any) => doc.data());
    });

    const goals = await Promise.all(promises).then((objectives: any) =>
      objectives
        .filter((objectives: any) => objectives)
        .map((objective: any) => {
          const user = users.find(
            (participant: any) => objective.userShortId === participant.id
          );

          return (
            user && {
              id: user.id,
              displayName: user.displayName,
              photoURL: user.photoURL,
              createdAt: user.createdAt,
              days: user.days || 0,
              what: objective && objective.what ? objective.what : '',
              why: objective && objective.why ? objective.why : '',
              updatedAt: user.updatedAt
            }
          );
        })
        .sort((x: any, y: any) =>
          moment(y.updatedAt.toDate()).diff(moment(x.updatedAt.toDate()))
        )
    );

    return { goals, users };
  };

  return {
    fetchGoals,
    ...props
  };
};

export default connect(mapStateToProps);

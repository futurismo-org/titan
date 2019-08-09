import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import shortId from 'shortid';

import firebase from '~/lib/firebase';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const user = state.user.target;
  const myResourceId = user ? `/users/${user.id}` : null;

  const isExistLazy = () =>
    firebase
      .firestore()
      .doc(myResourceId!)
      .get()
      .then(doc => doc.data()!.blockList)
      .then(list => list.filter((m: any) => m.userShortId === user.shortId))
      .then(list => {
        const result = list.length === 1;
        const data = result ? list[0] : null;

        return { result, data };
      });

  const updateHandler = () => {
    const newData = {
      id: shortId.generate(),
      createdAt: new Date(),
      userId: user.id,
      userShortId: user.shortId,
      userDisplayName: user.displayName,
      userPhotoURL: user.photoURL
    };

    const updateData = {
      blockList: firebase.firestore.FieldValue.arrayUnion(newData),
      createdAt: new Date()
    };

    return (
      myResourceId &&
      firebase
        .firestore()
        .doc(myResourceId)
        .update(updateData)
    );
  };

  const removeHandler = (data: any) => {
    const updateData = {
      blockList: firebase.firestore.FieldValue.arrayRemove(data)
    };

    return firebase
      .firestore()
      .doc(myResourceId!)
      .update(updateData);
  };

  return {
    updateHandler,
    isExistLazy,
    removeHandler,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);

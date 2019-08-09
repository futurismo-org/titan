import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import shortId from 'shortid';

import firebase from '~/lib/firebase';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const user = state.user.target;
  const myResourceId = user ? `/users/${user.id}` : null;

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
      muteList: firebase.firestore.FieldValue.arrayUnion(newData),
      createdAt: new Date()
    };

    return firebase
      .firestore()
      .doc(myResourceId!)
      .update(updateData);
  };

  return {
    updateHandler,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);

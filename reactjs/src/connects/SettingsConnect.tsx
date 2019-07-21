import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import firebase from '~/lib/firebase';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const user = state.firebase.profile;
  const userId = user.id;

  const resourceId = `/users/${userId}`;

  const isLogin = !user.isEmpty && user.isLoaded;

  const updateHandler = (data: any) => {
    const updateData = {
      ...data,
      updatedAt: new Date()
    };

    firebase
      .firestore()
      .doc(resourceId)
      .update(updateData)
      .then(() => window.alert('設定を更新しました。')) // eslint-disable-line
      .catch(() => window.alert('エラーが発生しました。')); // eslint-disable-line
  };

  return {
    user,
    resourceId,
    isLogin,
    updateHandler,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);

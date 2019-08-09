import { connect } from 'react-redux';

import * as firebase from '~/lib/firebase';

const mapStateToProps = (state: any, props: any) => {
  const user = state.user.target;
  const myUserId = state.firebase.profile.shortId;
  const targetUserId = user.shortId;

  const resourceId = `/mutes/${myUserId}/users/${targetUserId}`;

  const updateHandler = () => {
    const newData = {
      id: targetUserId,
      createdAt: new Date(),
      userId: user.id,
      userShortId: user.shortId,
      userDisplayName: user.displayName,
      userPhotoURL: user.photoURL
    };

    return firebase.create(resourceId, newData);
  };

  const isExistLazy = () => firebase.isExist(resourceId);
  const removeHandler = () => firebase.remove(resourceId);

  return {
    updateHandler,
    removeHandler,
    isExistLazy,
    ...props
  };
};

export default connect(mapStateToProps);

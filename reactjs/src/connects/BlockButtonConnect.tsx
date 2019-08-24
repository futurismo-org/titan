import { connect } from 'react-redux';
import * as firebase from '~/lib/firebase';

const mapStateToProps = (state: any, props: any) => {
  const blockedUser = state.user.target;
  const blockingUser = state.user.profile;
  const blockingUserId = blockingUser.shortId;
  const blockedUserId = blockedUser.shortId;

  const id = `${blockingUserId}_${blockedUserId}`;
  const resourceId = `/blocks/${id}`;

  const updateHandler = () => {
    const newData = {
      id,
      createdAt: new Date(),
      blockingUserId: blockingUserId,
      blockedUserId: blockedUserId,
      blockingUserDisplayName: blockingUser.displayName,
      blockingUserPhotoURL: blockingUser.photoURL,
      blockedUserDisplayName: blockedUser.displayName,
      blockedUserPhotoURL: blockedUser.photoURL
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

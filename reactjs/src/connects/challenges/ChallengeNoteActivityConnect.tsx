import { connect } from 'react-redux';
import { update, remove } from '~/lib/firebase';
import {
  deleteUserChallengeNote,
  updateUserChallengeNote
} from '~/lib/getstream';
import { createPost } from '~/lib/post';

const mapStateToProps = (state: any, props: any) => {
  let post;
  if (props.activity) {
    // native
    const { activity } = props;
    post = createPost(activity);
  } else {
    // web
    post = props;
  }
  const { noteId, rawData, userId, serverId, challengeId } = post.data;

  const resourceId = `/challenges/${challengeId}/notes/${noteId}`;

  const updateHandler = (props: any) => {
    const { text, type } = props;
    const data = {
      text,
      type,
      updatedAt: new Date()
    };

    return update(resourceId, data)
      .then(() => deleteUserChallengeNote(userId, challengeId, { serverId }))
      .then(() =>
        updateUserChallengeNote(userId, challengeId, {
          rawData,
          text,
          type
        })
      );
  };

  const deleteHandler = () => {
    return remove(resourceId).then(() =>
      deleteUserChallengeNote(userId, challengeId, { serverId })
    );
  };

  return {
    data: post.data,
    updateHandler,
    deleteHandler,
    ...props
  };
};

export default connect(mapStateToProps);

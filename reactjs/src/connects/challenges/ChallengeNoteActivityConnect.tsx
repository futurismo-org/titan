import { connect } from 'react-redux';
import { update, remove } from '~/lib/firebase';
import {
  deleteUserChallengeNote,
  updateUserChallengeNote
} from '~/lib/getstream';

const mapStateToProps = (state: any, props: any) => {
  const { data } = props;
  const { noteId, rawData, userId, serverId, challengeId } = data;

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

  const deleteHandler = () =>
    remove(resourceId).then(() =>
      deleteUserChallengeNote(userId, challengeId, { serverId })
    );

  return {
    updateHandler,
    deleteHandler,
    ...props
  };
};

export default connect(mapStateToProps);

import { connect } from 'react-redux';
import shortId from 'shortid';
import { postUserChallengeNote } from '~/lib/getstream';
import { create } from '~/lib/firebase';

const mapStateToProps = (state: any, props: any) => {
  const { challenge, user } = props;

  const saveHandler = (props: any) => {
    const { text, type } = props;

    const challengeId = challenge.id;
    const noteId = shortId.generate();
    const resourceId = `/challenges/${challengeId}/notes/${noteId}`;
    const userShortId = user.shortId;

    const data = {
      id: noteId,
      text,
      type,
      userId: userShortId,
      userName: user.displayName,
      userPhotoURL: user.photoURL,
      challengeId,
      challengeTitle: challenge.title,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return create(resourceId, data).then(() =>
      postUserChallengeNote(userShortId, challengeId, {
        noteId,
        user,
        type,
        text
      })
    );
  };

  return {
    saveHandler,
    ...props
  };
};

export default connect(mapStateToProps);

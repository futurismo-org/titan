import { connect } from 'react-redux';
import shortId from 'shortid';

import moment from '~/lib/moment';
import { POST_TYPE_OPEN, POST_TYPE_CLOSE } from '~/constants/post';
import { createPost } from '~/lib/post';
import { getUserChallengeTimeline } from '~/lib/getstream';

const generatePosts = (data: any, challenge: any) => {
  const notes = [];

  notes.push({
    id: shortId.generate(),
    type: POST_TYPE_OPEN,
    timestamp: challenge.openedAt.toDate(),
    data: {
      openedAt: challenge.openedAt.toDate()
    }
  });

  notes.push({
    id: shortId.generate(),
    type: POST_TYPE_CLOSE,
    timestamp: challenge.closedAt.toDate(),
    data: {
      closedAt: challenge.closedAt.toDate()
    }
  });

  data.map((post: any) => notes.push(createPost(post)));

  return notes;
};

const mapStateToProps = (state: any, props: any) => {
  const { challenge, user } = props;
  const challengeId = challenge.id;
  const userShortId = user.shortId;

  const profile = state.firebase.profile;
  const isMyProfile = (userShortId: string) => profile.shortId === userShortId;

  const feedNotes = () =>
    getUserChallengeTimeline(userShortId, challengeId)
      .then((data: any) => generatePosts(data, challenge))
      .then((posts: any) =>
        posts.sort((x: any, y: any) =>
          moment(x.timestamp).diff(moment(y.timestamp))
        )
      );

  return {
    userShortId,
    isMyProfile,
    feedNotes,
    ...props
  };
};

export default connect(mapStateToProps);

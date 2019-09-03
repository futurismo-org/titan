import { connect } from 'react-redux';
import shortId from 'shortid';

import moment from '~/lib/moment';
import { POST_TYPE_OPEN, POST_TYPE_CLOSE } from '~/constants/post';
import { createPost } from '~/lib/post';
import { getUserChallengeTimeline } from '~/lib/getstream';
import { isChallengeOpened, isChallengeClosed } from '~/lib/challenge';

const generatePosts = (data: any, challenge: any) => {
  const notes = [];

  if (isChallengeOpened(challenge.openedAt.toDate())) {
    notes.push({
      id: shortId.generate(),
      type: POST_TYPE_OPEN,
      timestamp: challenge.openedAt.toDate(),
      data: {
        openedAt: challenge.openedAt.toDate()
      }
    });
  }

  if (challenge.closedAt && isChallengeClosed(challenge.closedAt.toDate())) {
    notes.push({
      id: shortId.generate(),
      type: POST_TYPE_CLOSE,
      timestamp: challenge.closedAt.toDate(),
      data: {
        closedAt: challenge.closedAt.toDate()
      }
    });
  }

  data.map((post: any) => notes.push(createPost(post)));

  return notes.sort((x: any, y: any) =>
    moment(y.timestamp).diff(moment(x.timestamp))
  );
};

const mapStateToProps = (state: any, props: any) => {
  const { challenge, user } = props;
  const challengeId = challenge.id;
  const userShortId = user.shortId;

  const profile = state.firebase.profile;
  const isMyProfile = profile.shortId === userShortId;

  const feedNotes = () =>
    getUserChallengeTimeline(userShortId, challengeId).then((data: any) =>
      generatePosts(data, challenge)
    );

  return {
    userShortId,
    isMyProfile,
    feedNotes,
    ...props
  };
};

export default connect(mapStateToProps);

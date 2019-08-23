import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { postSubmission } from '~/lib/formcarry';

import { getTopicPath } from '~/lib/url';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const reportUser = state.firebase.profile;

  const handler = (
    topic: any,
    challenge: any,
    category: any,
    profile: any,
    note: any,
    collectionType: any,
    collectionId: string,
    data: any
  ) => {
    const getURL = (path: string) => `https://titan-fire.com/#${path}`;

    const topicInfo = topic
      ? {
          topicTitle: topic.title,
          topicId: topic.id,
          postUserName: topic.userName,
          postUserId: topic.userId,
          url: getURL(getTopicPath(topic.id, collectionType, collectionId))
        }
      : {};

    const challengeInfo = challenge
      ? {
          challengeTitle: challenge.title,
          challengeId: challenge.id,
          url: getURL(`/c/${challenge.id}`)
        }
      : {};

    const categoryInfo = category
      ? {
          categoryTitle: category.title,
          categoryId: category.id,
          url: getURL(`/cat/${category.id}`)
        }
      : {};

    const profileInfo = profile
      ? {
          profileUserId: profile.id,
          profileUserShortId: profile.shortId,
          profileDisplayName: profile.displayName,
          url: getURL(`/u/${profile.shortId}`)
        }
      : {};

    const noteInfo = note
      ? {
          noteId: note.noteId,
          noteChallengeId: note.challengeId
        }
      : {};

    const params = {
      ...topicInfo,
      ...challengeInfo,
      ...categoryInfo,
      ...profileInfo,
      ...noteInfo,
      collectionType: collectionType,
      collectionId: collectionId,
      reportUserName: reportUser.displayName,
      reportUserId: reportUser.id,
      reportUserShortId: reportUser.shortId,
      reportUserTwitterUserName: reportUser.twitterUserName,
      reportedAt: new Date(),
      ...data
    };
    return postSubmission(params);
  };

  return {
    handler,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);

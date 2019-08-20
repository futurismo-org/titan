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
    collectionType: any,
    collectionId: string,
    data: any
  ) => {
    const path = getTopicPath(topic.id, collectionType, collectionId);
    const url = `https://titan-fire.com/#${path}`;

    const topicInfo = topic
      ? {
          topicTitle: topic.title,
          topicId: topic.id,
          postUserName: topic.userName,
          postUserId: topic.userId
        }
      : {};

    const params = {
      url,
      ...topicInfo,
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

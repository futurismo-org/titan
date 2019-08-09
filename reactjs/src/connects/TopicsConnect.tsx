import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchTopics } from '~/actions/topicAction';
import { fetchMutes } from '~/actions/securityAction';

import { collectionShort, getTopicPath } from '../lib/url';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchTopics,
      fetchMutes
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const { collection, collectionId } = props;
  const resourceId =
    collection === 'general'
      ? '/topics'
      : `/${collection}/${collectionId}/topics`;

  const postButtonPath =
    collection === 'general'
      ? '/topics/new'
      : `/${collectionShort(collection)}/${collectionId}/t/new`;

  const topicPath = (topicId: string) =>
    getTopicPath(topicId, collection, collectionId);

  const allowSensitive =
    !state.firebase.profile.isEmpty && state.firebase.profile.allowSensitive;

  const mutes = state.mute.items;
  const muteUserIds = mutes.map((mute: any) => mute.id);
  const topics = state.topic.items
    .filter((topic: any) => !topic.banned)
    .filter((topic: any) => !muteUserIds.includes(topic.userId));

  const myUserId = state.firebase.profile.shortId;

  return {
    topics,
    loading: state.topic.loading || state.mute.loading,
    error: state.topic.error || state.mute.error,
    resourceId,
    postButtonPath,
    topicPath,
    allowSensitive,
    myUserId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);

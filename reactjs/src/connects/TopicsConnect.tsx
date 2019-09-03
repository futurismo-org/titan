import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchTopics } from '~/actions/topicAction';
import { fetchMutes } from '~/actions/muteAction';
import { fetchBlockingUsers } from '~/actions/blockAction';

import { collectionShort, getTopicPath } from '../lib/url';
import moment from '~/lib/moment';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchTopics,
      fetchMutes,
      fetchBlockingUsers
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
  const blockingUsers = state.block.items;
  const blockingUserIds = blockingUsers.map((item: any) => item.blockingUserId);
  const myUserId = state.firebase.profile.shortId;

  const topics = state.topic.items
    .filter((topic: any) => !topic.freezed)
    .filter((topic: any) => !muteUserIds.includes(topic.userId))
    .filter((topic: any) => !blockingUserIds.includes(topic.userId))
    .sort((x: any, y: any) =>
      moment(y.updatedAt.toDate()).diff(moment(x.updatedAt.toDate()))
    );

  return {
    topics,
    loading: state.topic.loading || state.mute.loading || state.block.loading,
    error: state.topic.error || state.mute.error || state.block.error,
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

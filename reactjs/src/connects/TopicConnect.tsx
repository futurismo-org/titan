import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchTopic } from '~/actions/topicAction';
import { setOgpInfo, resetOgpInfo } from '~/actions/ogpAction';
import { fetchBlockingUsers } from '~/actions/blockAction';

import { collectionShort } from '../lib/url';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchTopic,
      setOgpInfo,
      resetOgpInfo,
      fetchBlockingUsers
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const { collection } = props;
  const { topicId, collectionId } = props.match.params;

  const resourceId =
    collection === 'general'
      ? `/topics/${topicId}`
      : `${collection}/${collectionId}/topics/${topicId}`;

  const editTopicPath =
    collection === 'general'
      ? `/topics/${topicId}/edit`
      : `/${collectionShort(collection)}/${collectionId}/t/${topicId}/edit`;

  const redirectPath =
    collection === 'general'
      ? '/topics'
      : `/${collectionShort(collection)}/${collectionId}/topics`;

  const shareURL =
    collection === 'general'
      ? `https://titan-fire.com/topics/${topicId}`
      : `https://titan-fire.com/${collectionShort(
          collection
        )}/${collectionId}/t/${topicId}`;

  const topic = state.topic.target;
  const currentUser = state.user.profile;

  const isCurrentUser =
    topic && currentUser && topic.userId === currentUser.shortId;
  const isLogin = !currentUser.isEmpty && currentUser.isLoaded;
  const allowSensitive = currentUser && currentUser.allowSensitive;

  const myUserId = currentUser.shortId;

  const blockingUsers = state.block.items; // 自分をブロックしているユーザたち
  const blockingUserIds = blockingUsers.map((item: any) => item.blockingUserId);
  const blocked = topic && blockingUserIds.includes(topic.userId);

  return {
    topic,
    loading: state.topic.loading,
    error: state.topic.error,
    resourceId,
    shareURL,
    editTopicPath,
    redirectPath,
    isCurrentUser,
    isLogin,
    collection,
    collectionId,
    allowSensitive,
    blocked,
    myUserId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);

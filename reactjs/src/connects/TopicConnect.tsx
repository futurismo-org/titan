import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchTopic } from '~/actions/topicAction';
import { setOgpInfo, resetOgpInfo } from '~/actions/ogpAction';

import { collectionShort } from '../lib/url';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchTopic: fetchTopic,
      setOgpInfo: setOgpInfo,
      resetOgpInfo: resetOgpInfo
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const { collection } = props;
  const collectionId = props.match.params.collectionid;
  const { topicId } = props.match.params;

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
      : `httc/titan-fire.com/${collectionShort(
          collection
        )}/${collectionId}/t/${topicId}`;

  const topic = state.topic.target;
  const currentUser = state.firebase.profile;

  const isCurrentUser =
    topic && currentUser && topic.userId === currentUser.shortId;

  return {
    topic,
    loading: state.topic.loading,
    error: state.topic.error,
    resourceId,
    shareURL,
    editTopicPath,
    redirectPath,
    isCurrentUser,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);

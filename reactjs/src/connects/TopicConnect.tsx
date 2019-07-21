import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchTopic } from '~/actions/topicAction';
import { setOgpInfo, resetOgpInfo } from '~/actions/ogpAction';

import { getCollectionShort } from '../lib/url';

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
      : `/${getCollectionShort(collection)}/${collectionId}/t/${topicId}/edit`;

  const redirectPath =
    collection === 'general'
      ? '/topics'
      : `/${getCollectionShort(collection)}/${collectionId}/topics`;

  const shareURL =
    collection === 'general'
      ? `https://titan-fire.com/topics/${topicId}`
      : `https://titan-fire.com/${getCollectionShort(
          collection
        )}/${collectionId}/t/${topicId}`;

  return {
    topic: state.topic.target,
    loading: state.topic.loading,
    error: state.topic.error,
    resourceId,
    shareURL,
    editTopicPath,
    redirectPath,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);

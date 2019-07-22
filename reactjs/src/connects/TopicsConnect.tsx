import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchTopics } from '~/actions/topicAction';

import { collectionShort } from '../lib/url';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchTopics: fetchTopics
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
    collection === 'general'
      ? `/topics/${topicId}`
      : `/${collectionShort(collection)}/${collectionId}/t/${topicId}`;

  return {
    topics: state.topic.items,
    loading: state.topic.loading,
    error: state.topic.error,
    resourceId,
    postButtonPath,
    topicPath,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);

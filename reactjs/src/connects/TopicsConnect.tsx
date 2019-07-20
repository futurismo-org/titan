import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchTopics } from '~/actions/topicAction';

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

  return {
    topics: state.topic.items,
    loading: state.topic.loading,
    error: state.topic.error,
    resourceId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);

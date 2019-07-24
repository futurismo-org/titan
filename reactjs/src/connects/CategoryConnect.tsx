import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchCategory } from '~/actions/categoryAction';
import { fetchTopics } from '~/actions/topicAction';
import { getTopicsId } from '~/lib/resource';
import { getTopicPath } from '~/lib/url';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchCategory,
      fetchTopics
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const categoryId = props.match.params.id;
  const resourceId = `/categories/${categoryId}`;
  const topicsResourceId = getTopicsId('categories', categoryId);

  const category = state.category.target;
  const topics = state.topic.items;
  const topicPath = (topicId: string) =>
    getTopicPath(topicId, 'categories', categoryId);

  return {
    category,
    topics,
    loading: state.category.loading || state.topic.loading,
    error: state.category.error || state.topic.error,
    resourceId,
    topicsResourceId,
    topicPath,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);

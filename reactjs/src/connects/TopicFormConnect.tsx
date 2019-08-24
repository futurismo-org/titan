import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import shortid from 'shortid';
import { fetchTopic } from '~/actions/topicAction';

import { getTopicsPath } from '../lib/url';
import { getTopicId } from '~/lib/resource';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchTopic
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const { collection } = props;
  const { collectionId } = props.match.params;
  const isCreate = props.match.params.topicId === undefined;
  const topicId = isCreate ? shortid.generate() : props.match.params.topicId;

  const resourceId = getTopicId(topicId, collection, collectionId);
  const redirectPath = getTopicsPath(collection, collectionId);
  const currentUser = state.user.profile;

  const updateData = {
    id: topicId,
    updatedAt: new Date(),
    userName: currentUser.displayName,
    userId: currentUser.shortId,
    userPhotoURL: currentUser.photoURL
  };

  const newData = {
    ...updateData,
    createdAt: new Date()
  };

  return {
    topic: state.topic.target,
    loading: state.topic.loading,
    error: state.topic.error,
    resourceId,
    redirectPath,
    newData,
    updateData,
    isCreate,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);

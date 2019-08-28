import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import shortid from 'shortid';
import { fetchTopic } from '~/actions/topicAction';

import { getTopicsPath } from '../lib/url';
import { getTopicId } from '~/lib/resource';
import { postTopic } from '~/lib/getstream';

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
  const currentUser = state.firebase.profile;

  const updateData = {
    id: topicId,
    updatedAt: new Date(),
    userName: currentUser.displayName,
    userId: currentUser.shortId,
    userPhotoURL: currentUser.photoURL,
    collectioType: collection,
    collectionId
  };

  const newData = {
    ...updateData,
    createdAt: new Date()
  };

  const postTopicStream = (title: string) =>
    postTopic(currentUser.id, currentUser.shortId, {
      collectionType: collection,
      collectionId,
      topicId,
      user: currentUser,
      title
    });

  return {
    topic: state.topic.target,
    loading: state.topic.loading,
    error: state.topic.error,
    postTopicStream,
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

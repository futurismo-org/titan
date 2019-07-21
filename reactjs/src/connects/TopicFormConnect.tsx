import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import shortid from 'shortid';
import { fetchTopic } from '~/actions/topicAction';

import { getCollectionShort } from '../lib/url';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchTopic: fetchTopic
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const { collection } = props;
  const collectionId = props.match.params.collectionid;
  const isCreate = props.match.params.topicId === undefined;
  const topicId = isCreate ? shortid.generate() : props.match.params.topicId;

  const resourceId =
    collection === 'general'
      ? `/topics/${topicId}`
      : `${collection}/${collectionId}/topics/${topicId}`;

  const redirectPath =
    collection === 'general'
      ? '/topics'
      : `/${getCollectionShort(collection)}/${collectionId}/topics`;

  const currentUser = state.firebase.profile;

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

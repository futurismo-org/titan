import { connect } from 'react-redux';
import shortid from 'shortid';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import firebase from '~/lib/firebase';

const mapStateToProps = (state: any, props: any) => {
  const userShortId = props.match.params.id;
  const redirectPath = `/u/${userShortId}/reviews`;

  const isCreate = props.match.params.reviewId === undefined;
  const reviewId = isCreate ? shortid.generate() : props.match.params.reviewId;
  const resourceId = `/reviews/${userShortId}/posts/${reviewId}`;

  const userReview = state.firestore.data.userReview;

  const updateDataBase = {
    id: reviewId,
    updatedAt: new Date(),
    userId: userShortId
  };

  const newDataBase = {
    ...updateDataBase,
    createdAt: new Date()
  };

  const saveHandler = (
    title: string,
    text: string,
    type: string,
    startedAt: Date,
    endedAt: Date
  ) => {
    const db = firebase.firestore();
    if (isCreate) {
      const newData = { title, text, type, startedAt, endedAt, ...newDataBase };
      return db.doc(resourceId).set(newData);
    } else {
      const updateData = {
        title,
        text,
        type,
        startedAt,
        endedAt,
        ...updateDataBase
      };
      return db.doc(resourceId).update(updateData);
    }
  };

  return {
    redirectPath,
    saveHandler,
    userReview,
    isCreate,
    loading: isCreate ? false : !isLoaded(userReview),
    ...props
  };
};

const queries = (props: any) => {
  const userShortId = props.match.params.id;
  const reviewId = props.match.params.reviewId;

  const query = reviewId
    ? [
        {
          collection: 'reviews',
          doc: userShortId,
          storeAs: 'userReview',
          subcollections: [
            {
              collection: 'posts',
              doc: reviewId
            }
          ]
        }
      ]
    : [];

  return query;
};

export default compose(
  firestoreConnect(queries),
  connect(mapStateToProps)
) as any;

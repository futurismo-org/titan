import { connect } from 'react-redux';
import shortid from 'shortid';
import firebase from '~/lib/firebase';

const mapStateToProps = (state: any, props: any) => {
  const userShortId = props.match.params.id;
  const redirectPath = `/u/${userShortId}/reviews`;

  const isCreate = props.match.params.reviewId === undefined;
  const reviewId = isCreate ? shortid.generate() : props.match.params.reviewId;
  const resourceId = `/reviews/${userShortId}/posts/${reviewId}`;

  const updateDataBase = {
    id: reviewId,
    updatedAt: new Date(),
    userId: userShortId
  };

  const newDataBase = {
    ...updateDataBase,
    createdAt: new Date()
  };

  const saveHandler = (title: string, text: string, type: string) => {
    const db = firebase.firestore();
    if (isCreate) {
      const newData = { title, text, type, ...newDataBase };
      return db.doc(resourceId).set(newData);
    } else {
      const updateData = { title, text, type, ...updateDataBase };
      return db.doc(resourceId).update(updateData);
    }
  };

  return {
    redirectPath,
    saveHandler,
    ...props
  };
};

export default connect(mapStateToProps);

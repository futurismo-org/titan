import * as React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';

import firebase from '../../../lib/firebase';
import Progress from '../../atoms/CircularProgress';

import Paper from '../../templates/PaperWrapper';

const db = firebase.firestore();

const CategoryTopic = (props: any) => {
  const categoryId = props.props.match.params.categoryId;
  const topicId = props.props.match.params.topicId;

  const [value, loading, error] = useDocument(
    db
      .collection('categories')
      .doc(categoryId)
      .collection('topics')
      .doc(topicId)
  );

  const data = value && value.data();
  console.log(data);

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {data && <Paper>test</Paper>}
    </React.Fragment>
  );
};

export default CategoryTopic;

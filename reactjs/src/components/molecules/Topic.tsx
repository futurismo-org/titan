import * as React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';

import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import firebase from '../../lib/firebase';
import Progress from '../atoms/CircularProgress';

import Paper from '../templates/PaperWrapper';
import Title from '../atoms/Title';

const db = firebase.firestore();

const Topic = (props: any) => {
  const collection = props.collection;
  const collectionId = props.props.match.params.collectionId;
  const topicId = props.props.match.params.topicId;

  const [value, loading, error] = useDocument(
    db
      .collection(collection)
      .doc(collectionId)
      .collection('topics')
      .doc(topicId)
  );

  const data = value && value.data();

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {data && (
        <Paper>
          <Typography component="span" variant="body2" color="textPrimary">
            Posted by {data.userName || 'anonymous'}
          </Typography>
          {'     '}
          {moment(data.createdAt.toDate()).fromNow() || ''}
          <Title text={data.title} />
          {data.url && (
            <a href={data.url} rel="noopener noreferrer" target="_blank">
              {data.url}
            </a>
          )}
          <p />
          {data.text}
        </Paper>
      )}
    </React.Fragment>
  );
};

export default Topic;

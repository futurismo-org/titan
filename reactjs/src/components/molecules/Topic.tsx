import * as React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';

import moment from 'moment';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import firebase from '../../lib/firebase';
import Progress from '../atoms/CircularProgress';

import Paper from '../templates/PaperWrapper';
import Title from '../atoms/Title';
import MarkdownView from '../atoms/MarkdownView';

import NoStyledLink from '../atoms/NoStyledLink';

const db = firebase.firestore();

const Topic = (props: any) => {
  const { collection, user } = props;
  const { collectionId } = props.match.params;
  const { topicId } = props.match.params;

  const [value, loading, error] = useDocument(
    db
      .collection(collection)
      .doc(collectionId)
      .collection('topics')
      .doc(topicId)
  );

  const data = value && value.data();

  const collectionShort = collection === 'challenges' ? 'c' : 'cat';

  const onDeleteHandler = (topicId: string) => {
    if (window.confirm('削除したデータは元に戻せません。本当に削除しますか？')) { // eslint-disable-line
      firebase
        .firestore()
        .collection(collection)
        .doc(collectionId)
        .collection('topics')
        .doc(topicId)
        .delete();
    }
  };

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {data && (
        <React.Fragment>
          <Paper>
            <Typography component="span" variant="body2" color="textPrimary">
              Posted by {data.userName || 'Anonymous'}
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
            <MarkdownView text={data.text} />
          </Paper>
          {user.shortId === data.userId ? (
            <div style={{ textAlign: 'center' }}>
              <p />
              <NoStyledLink
                to={`/${collectionShort}/${collectionId}/t/${topicId}/edit`}
              >
                <Button type="button" color="default" variant="contained">
                  編集
                </Button>
              </NoStyledLink>
              <Button
                type="button"
                color="default"
                variant="contained"
                onClick={() => onDeleteHandler(topicId)}
              >
                削除
              </Button>
            </div>
          ) : null}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: any, props: any) => ({
  user: state.firebase.profile,
  ...props
});

export default connect(mapStateToProps)(Topic);

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
import NoStyledExternalLink from '../atoms/NoStyledExternalLink';

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
        .delete()
        .then(
          () =>
            (window.location.href = `/${collectionShort}/${collectionId}/topics`) // eslint-disable-line no-undef
        );
    }
  };

  /* eslint-disable no-undef */
  React.useEffect(() => {
    const addthisScript = document.createElement('script');
    addthisScript.setAttribute('type', 'text/javascript');
    addthisScript.setAttribute(
      'src',
      '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5d15ab4135aa44bf'
    );
    if (document.body) {
      document.body.appendChild(addthisScript);
    }
  }, []);

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
            {data.url ? (
              <NoStyledExternalLink href={data.url} target="_blank">
                <Title text={data.title} />
              </NoStyledExternalLink>
            ) : (
              <Title text={data.title} />
            )}
            <div className="addthis_inline_share_toolbox" />
            {data.url && (
              <a href={data.url} rel="noopener noreferrer" target="_blank">
                {data.url.substr(0, 30) + '...'}
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

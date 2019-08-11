import React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';

import MarkdownView from '~/web/components/atoms/MarkdownView';

import Error from '../atoms/Error';
import Progress from '../atoms/CircularProgress';

import Paper from '../templates/PaperWrapper';

import firebase from '~/lib/firebase';

const Document = (props: any) => {
  const { id } = props;
  const resourceId = `/documents/${id}`;

  const [value, loading, error] = useDocument(
    firebase.firestore().doc(resourceId)
  );

  const content = value && value.data()!.content;

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && <Progress />}
      {value && (
        <Paper>
          <MarkdownView text={content ? content : ''} />
        </Paper>
      )}
    </React.Fragment>
  );
};

export default Document;

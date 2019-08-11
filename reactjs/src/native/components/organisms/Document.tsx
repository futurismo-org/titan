import * as React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';

import MarkdownView from '../atoms/MarkdownView';

import Error from '../atoms/Error';
import Progress from '../atoms/CircularProgress';

import firebase from '~/lib/firebase';

const Document = (props: any) => {
  const { id } = props;
  const resourceId = `/documents/${id}`;

  const [value, loading, error] = useDocument(
    firebase.firestore().doc(resourceId)
  );

  const content = value && value.data() && value.data()!.content;

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && <Progress />}
      {value && <MarkdownView text={content ? content : ''} />}
    </React.Fragment>
  );
};

export default Document;

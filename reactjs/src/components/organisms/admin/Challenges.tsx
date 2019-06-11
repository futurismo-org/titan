import { useCollection } from 'react-firebase-hooks/firestore';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import * as React from 'react';

import firebase from '../../../lib/firebase';

import Progress from '../../atoms/CircularProgress';

const Challenges = () => {
  const [value, loading, error] = useCollection(
    firebase.firestore().collection('challenges')
  );

  const onDeleteHandler = (id: string) =>
    firebase
      .firestore()
      .collection('challenges')
      .doc(id)
      .delete();

  return (
    <React.Fragment>
      <h2>チャレンジ一覧</h2>
      <Link to="/admin/challenges/new">
        <Button type="button" variant="contained" color="primary">
          新規投稿
        </Button>
      </Link>
      <ul>
        {error && <strong>Error: {error}</strong>}
        {loading && <Progress />}
        {value && (
          <React.Fragment>
            {value!.docs.map((doc: any) => (
              <li key={doc.id}>
                {doc.data().title}
                <Link
                  to={`/admin/challenges/new/${doc.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Button type="button" color="primary">
                    編集
                  </Button>
                </Link>
                <Button
                  type="button"
                  color="secondary"
                  onClick={() => onDeleteHandler(doc.id)}
                >
                  削除
                </Button>
              </li>
            ))}
          </React.Fragment>
        )}
      </ul>
    </React.Fragment>
  );
};

export default Challenges;

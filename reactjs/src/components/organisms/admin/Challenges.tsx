import { useCollection } from 'react-firebase-hooks/firestore';

import Button from '@material-ui/core/Button';
import * as React from 'react';

import { List, ListItem, ListItemText } from '@material-ui/core';
import firebase from '../../../lib/firebase';
import Progress from '../../atoms/CircularProgress';

import Link from '../../atoms/NoStyledLink';

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
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {value && (
        <List>
          {value!.docs.map((doc: any) => (
            <ListItem key={doc.id}>
              <ListItemText>
                {doc.data().id}
                <br />
                {doc.data().title}
              </ListItemText>
              <Link to={`/admin/challenges/new/${doc.id}`}>
                <Button type="button" color="primary" variant="contained">
                  編集
                </Button>
              </Link>
              <Button
                type="button"
                color="secondary"
                variant="contained"
                onClick={() => onDeleteHandler(doc.id)}
              >
                削除
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </React.Fragment>
  );
};

export default Challenges;

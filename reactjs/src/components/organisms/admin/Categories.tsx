import { useCollection } from 'react-firebase-hooks/firestore';

import Button from '@material-ui/core/Button';
import * as React from 'react';

import { List, ListItem, ListItemText } from '@material-ui/core';
import firebase from '../../../lib/firebase';
import Progress from '../../atoms/CircularProgress';

import Link from '../../atoms/NoStyledLink';
import PostButton from '../../atoms/PostButton';

const Categories = () => {
  const [value, loading, error] = useCollection(
    firebase.firestore().collection('categories')
  );

  const onDeleteHandler = (id: string) =>
    firebase
      .firestore()
      .collection('categories')
      .doc(id)
      .delete();

  return (
    <React.Fragment>
      <h2>カテゴリ一覧</h2>
      <PostButton to="/admin/categories/new" />
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
              <Link to={`/admin/categories/new/${doc.id}`}>
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
              <Link to={`/categories/${doc.id}/dashboard`}>
                <Button type="button" color="default" variant="contained">
                  閲覧
                </Button>
              </Link>
            </ListItem>
          ))}
        </List>
      )}
    </React.Fragment>
  );
};

export default Categories;

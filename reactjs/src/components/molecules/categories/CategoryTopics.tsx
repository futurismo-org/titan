import * as React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button
} from '@material-ui/core';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import PostButton from '../../atoms/PostButton';

import NoStyledLink from '../../atoms/NoStyledLink';

import firebase from '../../../lib/firebase';
import Progress from '../../atoms/CircularProgress';

const TitleWrapper = styled.div`
  display: flex;
`;

const CategoryTopics = (props: any) => {
  const { category } = props;

  const [value, loading, error] = useCollection(
    firebase
      .firestore()
      .collection('categories')
      .doc(category.id)
      .collection('topics')
  );

  return (
    <List>
      <ListItem>
        <ListItemText>
          <Typography variant="h5" component="h5">
            知見まとめ
          </Typography>
        </ListItemText>
        <PostButton
          to={`/categories/${category.id}/topics/new`}
          type="button"
        />
      </ListItem>
      <ListItem />
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {value &&
        value!.docs.map((doc: any) => (
          <ListItem key={doc.id}>
            <ListItemText>{doc.data().title}</ListItemText>
            <NoStyledLink to={`/categories/${doc.id}/edit`}>
              <Button type="button" color="primary" variant="contained">
                編集
              </Button>
            </NoStyledLink>
            <Button
              type="button"
              color="secondary"
              variant="contained"
              // onClick={() => onDeleteHandler(doc.id)}
            >
              削除
            </Button>
          </ListItem>
        ))}
    </List>
  );
};

export default CategoryTopics;

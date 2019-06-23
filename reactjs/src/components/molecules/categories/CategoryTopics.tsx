import * as React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button
} from '@material-ui/core';
import { useCollection } from 'react-firebase-hooks/firestore';
import moment from 'moment';
import { connect } from 'react-redux';

import PostButton from '../../atoms/PostButton';

import NoStyledLink from '../../atoms/NoStyledLink';

import firebase from '../../../lib/firebase';
import Progress from '../../atoms/CircularProgress';

const CategoryTopics = (props: any) => {
  const { category, user } = props;

  const [value, loading, error] = useCollection(
    firebase
      .firestore()
      .collection('categories')
      .doc(category.id)
      .collection('topics')
  );

  const onDeleteHandler = (topicId: string) => {
    if (window.confirm('削除したデータは元に戻せません。本当に削除しますか？')) { // eslint-disable-line
      firebase
        .firestore()
        .collection('categories')
        .doc(category.id)
        .collection('topics')
        .doc(topicId)
        .delete();
    }
  };

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
        value!.docs
          .map((doc: any) => doc.data())
          .map((topic: any) => (
            <ListItem alignItems="flex-start" key={topic.id}>
              <ListItemAvatar>
                <Avatar
                  alt={topic.userName || 'anonymous'}
                  src={
                    topic.userPhotoURL ||
                    `${process.env.PUBLIC_URL}/anonymous.png`
                  }
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <NoStyledLink
                    to={`/categories/${category.id}/topics/${topic.id}`}
                  >
                    {topic.title}
                  </NoStyledLink>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Posted by {topic.userName || 'anonymous'}
                    </Typography>
                    {'     '}
                    {moment(topic.createdAt.toDate()).fromNow() || ''}
                  </React.Fragment>
                }
              />
              {user.id === topic.userId ? (
                <React.Fragment>
                  <NoStyledLink
                    to={`/categories/${category.id}/topics/${topic.id}/edit`}
                  >
                    <Button type="button" color="default" variant="contained">
                      編集
                    </Button>
                  </NoStyledLink>
                  <Button
                    type="button"
                    color="default"
                    variant="contained"
                    onClick={() => onDeleteHandler(topic.id)}
                  >
                    削除
                  </Button>
                </React.Fragment>
              ) : null}
            </ListItem>
          ))}
    </List>
  );
};

const mapStateToProps = (state: any, props: any) => ({
  user: state.firebase.profile,
  ...props
});

export default connect(mapStateToProps)(CategoryTopics);

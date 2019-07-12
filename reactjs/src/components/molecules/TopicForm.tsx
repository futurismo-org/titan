import React, { useState, useEffect } from 'react';
import shortid from 'shortid';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import firebase from '../../lib/firebase';

const db = firebase.firestore();

const TopicForm = (props: any) => {
  const { collection, collectionId, user, push } = props;
  const topicId = props.topicId ? props.topicId : shortid.generate();

  const [title, setTitle] = useState('');
  const [url, setURL] = useState('');
  const [text, setText] = useState('');

  const onTitleChange = (e: any) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  const onURLChange = (e: any) => {
    e.preventDefault();
    setURL(e.target.value);
  };
  const onTextChange = (e: any) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const isCreate = props.topicId === undefined;

  const collectionShort = collection === 'challenges' ? 'c' : 'cat';

  const resourceId =
    collection === 'general'
      ? `/topics/${topicId}`
      : `/${collection}/${collectionId}/topics/${topicId}`;

  const updateHandler = (e: any) => {
    e.preventDefault();

    const newData = {
      id: topicId,
      title,
      url,
      text,
      createdAt: new Date(),
      updatedAt: new Date(),
      userName: user.displayName,
      userId: user.shortId,
      userPhotoURL: user.photoURL
    };

    db.doc(resourceId)
      .set(newData)
      .then(() => window.alert("投稿が完了しました。")) // eslint-disable-line
      .then(() =>
        push(
          collection === 'general'
            ? '/topics'
            : `/${collectionShort}/${collectionId}/topics`
        )
      )
      .catch(() => window.alert("エラーが発生しました。")) // eslint-disable-line
  };

  useEffect(() => {
    if (!isCreate) {
      db.doc(resourceId)
        .get()
        .then(doc => doc.data())
        .then(topic => {
          setTitle(topic!.title);
          setURL(topic!.url);
          setText(topic!.text);
        });
    }
  }, [isCreate, resourceId]);

  return (
    <React.Fragment>
      <form noValidate onSubmit={updateHandler}>
        <TextField
          value={title}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label="タイトル"
          name="title"
          autoFocus
          onChange={onTitleChange}
        />
        <TextField
          value={url}
          variant="outlined"
          margin="normal"
          fullWidth
          id="url"
          name="url"
          label="URL"
          onChange={onURLChange}
        />
        <p>
          情報をシェアするときは、URLを入力してください。質問するときは、URLを空にしてください。
        </p>
        <TextField
          value={text}
          variant="outlined"
          margin="normal"
          fullWidth
          id="text"
          name="text"
          label="テキスト"
          rows={6}
          multiline
          onChange={onTextChange}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          投稿
        </Button>
      </form>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any, props: any) => {
  return {
    user: state.firebase.profile,
    collectionId: props.match.params.collectionId,
    topicId: props.match.params.topicId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  { push }
)(TopicForm);

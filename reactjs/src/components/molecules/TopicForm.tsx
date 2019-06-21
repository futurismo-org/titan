import React, { useState, useEffect } from 'react';
import { ulid } from 'ulid';
import { TextField, Button } from '@material-ui/core';

import firebase from '../../lib/firebase';

const db = firebase.firestore();

const TopicForm = (props: any) => {
  const { collection, categoryId } = props;

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
  const topicId = isCreate ? ulid() : props.match.params.id;

  const updateHandler = (e: any) => {
    e.preventDefault();

    const newData = {
      id: topicId,
      title: title,
      url: url,
      text: text
    };

    db.collection(collection)
      .doc(categoryId)
      .collection('topics')
      .doc(topicId)
      .set(newData);
  };

  useEffect(() => {
    if (!isCreate) {
      db.collection(collection)
        .doc(categoryId)
        .collection('topic')
        .doc(topicId)
        .get()
        .then(doc => doc.data())
        .then(topic => {
          setTitle(topic!.title);
          setURL(topic!.url);
          setText(topic!.text);
        });
    }
  }, [categoryId, collection, isCreate, topicId]);

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
        or
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

export default TopicForm;

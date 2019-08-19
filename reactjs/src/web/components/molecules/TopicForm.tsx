import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import TextField from '~/web/components/atoms/TextField';

import firebase from '~/lib/firebase';
import Progress from '../atoms/CircularProgress';
import { getPublicIP } from '~/web/lib/network';

const db = firebase.firestore();

const TopicForm = (props: any) => {
  const {
    resourceId,
    topic,
    fetchTopic,
    redirectPath,
    isCreate,
    history,
    loading,
    error
  } = props;

  const [title, setTitle] = useState('');
  const [url, setURL] = useState('');
  const [text, setText] = useState('');
  const [ip, setIP] = useState('');

  useEffect(() => {
    if (!isCreate) {
      if (!topic) {
        fetchTopic(resourceId);
      } else {
        setTitle(topic.title);
        setURL(topic.url);
        setText(topic.text);
      }
    }

    getPublicIP().then((ip: string) => setIP(ip));
  }, [fetchTopic, isCreate, resourceId, topic]);

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

  const updateHandler = (e: any) => {
    e.preventDefault();

    if (isCreate) {
      const newData = { title, url, text, ip, ...props.newData };
      db.doc(resourceId)
        .set(newData)
        .then(() => window.alert('投稿が完了しました。')) // eslint-disable-line
        .then(() => history.push(redirectPath))
        .catch(() => window.alert('エラーが発生しました。')); // eslint-disable-line
    } else {
      const updateData = { title, url, text, ip, ...props.updateData };
      db.doc(resourceId)
        .update(updateData)
        .then(() => window.alert('更新が完了しました。')) // eslint-disable-line
        .then(() => history.push(redirectPath))
        .catch(() => window.alert('エラーが発生しました。')); // eslint-disable-line
    }
  };

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {(isCreate || topic) && (
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ fontWeight: 'bold' }}
            >
              投稿
            </Button>
          </form>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default withRouter(TopicForm);

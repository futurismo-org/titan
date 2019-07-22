import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-native';
import { Toast, Form, Text, Item, Label, Input, Textarea } from 'native-base';

import firebase from '~/lib/firebase';
import SubmitButton from '../atoms/SubmitButton';
import Progress from '~/native/components/atoms/CircularProgress';

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

  useEffect(() => {
    if (!isCreate) {
      if (!topic && !loading) {
        fetchTopic(resourceId);
      } else {
        setTitle(topic.title);
        setURL(topic.url);
        setText(topic.text);
      }
    }
  }, [fetchTopic, isCreate, loading, resourceId, topic]);

  const successToast = () =>
    Toast.show({
      text: '投稿に成功しました！',
      duration: 3000,
      onClose: () => history.push(redirectPath)
    });

  const errorToast = (message: string) =>
    Toast.show({
      text: `投稿に失敗しました。(${message})`,
      duration: 3000
    });

  const updateHandler = () => {
    if (isCreate) {
      const newData = { title, url, text, ...props.newData };
      db.doc(resourceId)
        .set(newData)
        .then(() => successToast())
        .catch(error => errorToast(error.message));
    } else {
      const updateData = { title, url, text, ...props.updateData };
      db.doc(resourceId)
        .update(updateData)
        .then(() => successToast())
        .catch(error => errorToast(error.message));
    }
  };

  return (
    <React.Fragment>
      {error && <Text>Error: {error}</Text>}
      {loading && <Progress />}
      {topic && (
        <Form>
          <Item floatingLabel>
            <Label>タイトル</Label>
            <Input value={title} onChangeText={text => setTitle(text)} />
          </Item>
          <Item floatingLabel>
            <Label>URL</Label>
            <Input value={url} onChangeText={text => setURL(text)} />
          </Item>
          <Text />
          <Text>
            情報をシェアするときは、URLを入力してください。質問するときは、URLを空にしてください。
          </Text>
          <Textarea
            bordered
            rowSpan={5}
            placeholder="テキスト"
            value={text}
            onChangeText={text => setText(text)}
          />
          <Text />
          <SubmitButton handler={() => updateHandler()} />
        </Form>
      )}
    </React.Fragment>
  );
};

export default withRouter(TopicForm);

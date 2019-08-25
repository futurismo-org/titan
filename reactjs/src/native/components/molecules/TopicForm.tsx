import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-native';
import { Toast, Form, Text, Item, Label, Input, Textarea } from 'native-base';

import firebase from '~/lib/firebase';
import SubmitButton from '../atoms/SubmitButton';
import Progress from '~/native/components/atoms/CircularProgress';
import { getPublicIP } from '~/native/lib/network';
import { successToast, errorToast } from '../atoms/Toast';

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
  }, [fetchTopic, isCreate, loading, resourceId, topic]);

  const updateHandler = () => {
    if (isCreate) {
      const newData = { title, url, text, ip, ...props.newData };
      db.doc(resourceId)
        .set(newData)
        .then(() =>
          successToast(redirectPath, history.replace, '投稿に成功しました')
        )
        .catch(error => errorToast(error.message));
    } else {
      const updateData = { title, url, text, ip, ...props.updateData };
      db.doc(resourceId)
        .update(updateData)
        .then(() =>
          successToast(redirectPath, history.replace, '投稿に成功しました')
        )
        .catch(error => errorToast(error.message));
    }
  };

  return (
    <React.Fragment>
      {error && <Text>Error: {error}</Text>}
      {loading && <Progress />}
      {!loading && (
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
          <Item>
            <Text style={{ lineHeight: 20 }}>
              情報をシェアするときは、URLを入力してください。質問するときは、URLを空にしてください。
            </Text>
          </Item>
          <Text />
          <Text />
          <Textarea
            style={{ marginHorizontal: 15 }}
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

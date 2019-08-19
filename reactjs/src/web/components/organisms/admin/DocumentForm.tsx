import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import { Switch } from '@material-ui/core';
import TextField from '~/web/components/atoms/TextField';

import firebase from '~/lib/firebase';
import MarkdownView from '../../atoms/MarkdownView';

import { brandDark } from '~/lib/theme';

const Form = (props: any) => {
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState(false);

  const onContentChange = (e: any) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const onPreviewChange = (e: any) => {
    e.preventDefault();
    setPreview(e.target.checked);
  };

  const { title, id } = props;

  const updateHandler = (e: any) => {
    e.preventDefault();

    const updateData = {
      id,
      title,
      content,
      updatedAt: new Date()
    };

    firebase
      .firestore()
      .collection('documents')
      .doc(id)
      .set(updateData)
      .then(() => window.alert('更新が完了しました。')) //eslint-disable-line
      .catch(err => console.log(err));
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection('documents')
      .doc(id)
      .get()
      .then(doc => doc.data())
      .then((data: any) => {
        setContent(data && data.content ? data.content : '');
      });
  }, [id]);

  return (
    <React.Fragment>
      <h2>{title}</h2>
      <form noValidate onSubmit={updateHandler}>
        <TextField
          value={content}
          variant="outlined"
          margin="normal"
          fullWidth
          id={id}
          name={id}
          label=""
          rows={10}
          multiline
          style={{ outlineColor: brandDark }}
          onChange={onContentChange}
        />
        <h3>プレビュー</h3>
        <Switch checked={preview} onChange={onPreviewChange} />
        {preview && <MarkdownView text={content} />}
        <Button
          type="submit"
          style={{ fontWeight: 'bold' }}
          fullWidth
          variant="contained"
          color="primary"
        >
          投稿
        </Button>
      </form>
    </React.Fragment>
  );
};

const DocumentForm = (props: any) => {
  return (
    <React.Fragment>
      <Form title="利用規約" id="terms_of_use" />
      <Form title="プライバシーポリシー" id="privacy_policy" />
      <Form title="コミュニティガイドライン" id="guidelines" />
      <Form title="Titanについて" id="about" />
    </React.Fragment>
  );
};

export default DocumentForm;

import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { ulid } from 'ulid';
import firebase from '../../../lib/firebase';

const ChallengeForm = (props: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [overview, setOverview] = useState('');
  const [rules, setRules] = useState('');

  const onTitleChange = (e: any) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  const onDescriptionChange = (e: any) => {
    e.preventDefault();
    setDescription(e.target.value);
  };
  const onOverviewChange = (e: any) => {
    e.preventDefault();
    setOverview(e.target.value);
  };
  const onRulesChange = (e: any) => {
    e.preventDefault();
    setRules(e.target.value);
  };

  const isCreate = props.match.params.id === undefined;

  const pageTitle = isCreate ? 'チャレンジ新規投稿' : 'チャレンジ編集';

  const updateHandler = (e: any) => {
    e.preventDefault();

    const id = isCreate ? ulid() : props.match.params.id;
    const newData = {
      id: id,
      title: title,
      description: description,
      overview: overview,
      rules: rules,
      updatedAt: new Date()
    };
    firebase
      .firestore()
      .collection('challenges')
      .doc(id)
      .set(newData);
    window.location.href = '/#/admin'; // eslint-disable-line
  };

  useEffect(() => {
    if (!isCreate) {
      firebase
        .firestore()
        .collection('challenges')
        .doc(props.match.params.id)
        .get()
        .then(doc => doc.data())
        .then(challenge => {
          setTitle(challenge!.title);
          setDescription(challenge!.description);
          setOverview(challenge!.overview);
          setRules(challenge!.rules);
        });
    }
  }, [isCreate, props.match.params.id]);

  return (
    <React.Fragment>
      <React.Fragment>
        <h2>{pageTitle}</h2>
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
            value={description}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="description"
            name="description"
            label="説明"
            onChange={onDescriptionChange}
          />
          <TextField
            value={overview}
            variant="outlined"
            margin="normal"
            fullWidth
            id="overview"
            name="overview"
            label="概要"
            rows={8}
            multiline
            onChange={onOverviewChange}
          />
          <TextField
            value={rules}
            variant="outlined"
            margin="normal"
            fullWidth
            id="rules"
            name="rules"
            label="ルール"
            rows={8}
            multiline
            onChange={onRulesChange}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            投稿
          </Button>
        </form>
      </React.Fragment>
    </React.Fragment>
  );
};

export default ChallengeForm;

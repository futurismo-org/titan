import React, { useEffect, useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import shortid from 'shortid';
import moment from 'moment';
import firebase from '~/lib/firebase';
import MarkdownView from '../../atoms/MarkdownView';

const CategoryForm = (props: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [overview, setOverview] = useState('');

  const [channelId, setChannelId] = useState('');
  const [challengeRefs, setChallengeRefs] = useState('');

  const [createdAt, setCreatedAt] = useState(
    moment(new Date()).format('YYYY-MM-DD')
  );

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
  const onChannelIdChange = (e: any) => {
    e.preventDefault();
    setChannelId(e.target.value);
  };
  const onChallengeRefsChange = (e: any) => {
    e.preventDefault();
    setChallengeRefs(e.target.value);
  };

  const isCreate = props.match.params.id === undefined;

  const pageTitle = isCreate ? 'カテゴリ新規投稿' : 'カテゴリ編集';

  const updateHandler = (e: any) => {
    e.preventDefault();

    const id = isCreate ? shortid.generate() : props.match.params.id;
    const newData = {
      id,
      title,
      description,
      overview,
      createdAt: new Date(createdAt),
      updatedAt: new Date(),
      channelId,
      challengeRefs:
        challengeRefs === ''
          ? null
          : challengeRefs
              .split(',')
              .map((path: string) => firebase.firestore().doc(path.trim()))
    };
    firebase
      .firestore()
      .collection('categories')
      .doc(id)
      .set(newData)
      .then(() => (window.location.href = '/admin')); //eslint-disable-line no-undef
  };

  useEffect(() => {
    if (!isCreate) {
      firebase
        .firestore()
        .collection('categories')
        .doc(props.match.params.id)
        .get()
        .then(doc => doc.data())
        .then(challenge => {
          setTitle(challenge!.title);
          setDescription(challenge!.description);
          setOverview(challenge!.overview);
          setChannelId(challenge!.channelId);
          setChallengeRefs(
            !challenge!.challengeRefs
              ? ''
              : challenge!.challengeRefs
                  .map(
                    (docRef: firebase.firestore.DocumentReference) =>
                      docRef.path
                  )
                  .toString()
          );
          setCreatedAt(
            moment(challenge!.createdAt.toDate()).format('YYYY-MM-DD')
          );
        });
    }
  }, [isCreate, props.match.params.id]);

  return (
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
          value={channelId}
          variant="outlined"
          margin="normal"
          id="channelId"
          label="チャンネルID"
          onChange={onChannelIdChange}
        />
        <TextField
          value={challengeRefs}
          variant="outlined"
          margin="normal"
          fullWidth
          id="challnegeRefs"
          label="チャレンジ参照"
          rows={4}
          multiline
          onChange={onChallengeRefsChange}
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
        <Button type="submit" fullWidth variant="contained" color="primary">
          投稿
        </Button>
        <h2>概要プレビュー</h2>
        <MarkdownView text={overview} />
      </form>
    </React.Fragment>
  );
};

export default CategoryForm;

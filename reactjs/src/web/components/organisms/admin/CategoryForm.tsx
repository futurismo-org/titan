import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';

import shortid from 'shortid';
import moment from 'moment';
import { Switch } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import TextField from '~/web/components/atoms/TextField';
import firebase from '~/lib/firebase';
import MarkdownView from '../../atoms/MarkdownView';

const CategoryForm = (props: any) => {
  const { history } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [overview, setOverview] = useState('');
  const [overviewiOS, setOverviewiOS] = useState('');

  const [channelId, setChannelId] = useState('');
  const [challengeRefs, setChallengeRefs] = useState('');
  const [sensitive, setSensitive] = useState(false);
  const [freezed, setFreezed] = useState(false);
  const [ios, setiOS] = useState(false);

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
  const onSensitiveChange = (e: any) => {
    e.preventDefault();
    setSensitive(e.target.checked);
  };
  const onFreezedChange = (e: any) => {
    e.preventDefault();
    setFreezed(e.target.checked);
  };
  const oniOSChange = (e: any) => {
    e.preventDefault();
    setiOS(e.target.checked);
  };
  const onOverviewiOSChange = (e: any) => {
    e.preventDefault();
    setOverviewiOS(e.target.value);
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
      sensitive,
      freezed,
      ios,
      overviewiOS,
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
      .then(() => window.alert('投稿が完了しました。')) // eslint-disable-line
      .then(() => history.push('/admin'));
  };

  useEffect(() => {
    if (!isCreate) {
      firebase
        .firestore()
        .collection('categories')
        .doc(props.match.params.id)
        .get()
        .then(doc => doc.data())
        .then(category => {
          setTitle(category!.title);
          setDescription(category!.description);
          setOverview(category!.overview);
          setChannelId(category!.channelId);
          setChallengeRefs(
            !category!.challengeRefs
              ? ''
              : category!.challengeRefs
                  .map(
                    (docRef: firebase.firestore.DocumentReference) =>
                      docRef.path
                  )
                  .toString()
          );
          setCreatedAt(
            moment(category!.createdAt.toDate()).format('YYYY-MM-DD')
          );
          setSensitive(category!.sensitive ? category!.sensitive : false);
          setFreezed(category!.freezed ? category!.freezed : false);
          setiOS(category!.ios ? category!.ios : false);
          setOverviewiOS(category!.overviewiOS ? category!.overviewiOS : '');
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
        {'センシティブな内容'}
        <Switch checked={sensitive} onChange={onSensitiveChange} />
        {'凍結'}
        <Switch checked={freezed} onChange={onFreezedChange} />
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
        <h2>概要プレビュー</h2>
        <MarkdownView text={overview} />
        <h2>Apple Store用特別対応</h2>
        {'iOS'}
        <Switch checked={ios} onChange={oniOSChange} />
        {ios && (
          <React.Fragment>
            <TextField
              value={overviewiOS}
              variant="outlined"
              margin="normal"
              fullWidth
              id="overviewiOS"
              name="overviewiOS"
              label="概要(iOS)"
              rows={8}
              multiline
              onChange={onOverviewiOSChange}
            />
            <MarkdownView text={overviewiOS} />
          </React.Fragment>
        )}
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
  );
};

export default withRouter(CategoryForm);

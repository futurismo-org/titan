import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';

import { ulid } from 'ulid';
import moment from 'moment';

import firebase from '../../../lib/firebase';
import MarkdownView from '../../atoms/MarkdownView';

const ChallengeForm = (props: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [overview, setOverview] = useState('');
  const [rules, setRules] = useState('');

  const [channelId, setChannelId] = useState('');
  const [categoryRef, setCategoryRef] = useState('');
  const [webhookURL, setWebhookURL] = useState('');
  const [participantsCount, setParticipantsCount] = useState(0);

  const [privateFlag, setPrivateFlag] = useState(false);
  const [price, setPrice] = useState(0);
  const [length, setLength] = useState(0);

  const [openedAt, setOpenedAt] = useState(
    moment(new Date()).format('YYYY-MM-DD')
  );
  const [closedAt, setClosedAt] = useState(
    moment(new Date()).format('YYYY-MM-DD')
  );
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
  const onRulesChange = (e: any) => {
    e.preventDefault();
    setRules(e.target.value);
  };
  const onChannelIdChange = (e: any) => {
    e.preventDefault();
    setChannelId(e.target.value);
  };
  const onWebhookURLChange = (e: any) => {
    e.preventDefault();
    setWebhookURL(e.target.value);
  };
  const onCategoryRefChange = (e: any) => {
    e.preventDefault();
    setCategoryRef(e.target.value);
  };
  const onOpenedAtChange = (e: any) => {
    e.preventDefault();
    const date = e.target.value;
    setOpenedAt(date);
  };
  const onClosedAtChange = (e: any) => {
    e.preventDefault();
    const date = e.target.value;
    setClosedAt(date);
  };
  const onPrivateFlagChange = (e: any) => {
    e.preventDefault();
    setPrivateFlag(e.target.checked);
  };
  const onPriceChange = (e: any) => {
    setPrice(e.target.value);
  };
  const onLengthChange = (e: any) => {
    e.preventDefault();
    setLength(e.target.value);
    const l = e.target.value;
    setClosedAt(
      moment(new Date(openedAt))
        .add('days', l)
        .format('YYYY-MM-DD')
    );
  };

  const isCreate = props.match.params.id === undefined;

  const pageTitle = isCreate ? 'チャレンジ新規投稿' : 'チャレンジ編集';

  const updateHandler = (e: any) => {
    e.preventDefault();

    const id = isCreate ? ulid() : props.match.params.id;
    const newData = {
      id,
      title,
      description,
      overview,
      rules,
      createdAt: new Date(createdAt),
      updatedAt: new Date(),
      channelId,
      webhookURL,
      categoryRef: firebase.firestore().doc(categoryRef),
      openedAt: new Date(new Date(openedAt).setHours(0, 0, 0, 0)),
      closedAt: new Date(new Date(closedAt).setHours(23, 59, 59, 59)),
      participantsCount,
      private: privateFlag,
      price: Number(price)
    };
    firebase
      .firestore()
      .collection('challenges')
      .doc(id)
      .set(newData)
      .then(() => (window.location.href = '/admin')); //eslint-disable-line no-undef
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
          setChannelId(challenge!.channelId);
          setWebhookURL(challenge!.webhookURL);
          setCategoryRef(challenge!.categoryRef.path);
          setOpenedAt(
            moment(challenge!.openedAt.toDate()).format('YYYY-MM-DD')
          );
          setClosedAt(
            moment(challenge!.closedAt.toDate()).format('YYYY-MM-DD')
          );
          setCreatedAt(
            moment(challenge!.createdAt.toDate()).format('YYYY-MM-DD')
          );
          setParticipantsCount(challenge!.participantsCount);
          const flag = challenge!.private ? challenge!.private : false;
          setPrivateFlag(flag);
          setPrice(challenge!.price || 0);
        });
    }
  }, [isCreate, props.match.params.id]);

  return (
    <React.Fragment>
      <h2>{pageTitle}</h2>
      <form noValidate onSubmit={updateHandler}>
        <TextField
          id="openedAt"
          label="開始日"
          type="date"
          value={openedAt}
          onChange={onOpenedAtChange}
        />
        <TextField
          id="closedAt"
          label="終了日"
          type="date"
          value={closedAt}
          onChange={onClosedAtChange}
        />
        <TextField
          value={length}
          variant="outlined"
          margin="normal"
          id="length"
          label="開催日数"
          onChange={onLengthChange}
        />
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
          value={channelId}
          variant="outlined"
          margin="normal"
          id="channelId"
          label="チャンネルID"
          onChange={onChannelIdChange}
        />
        <TextField
          value={categoryRef}
          variant="outlined"
          margin="normal"
          id="categoryRef"
          label="カテゴリ参照"
          onChange={onCategoryRefChange}
        />
        <TextField
          value={price}
          variant="outlined"
          margin="normal"
          id="price"
          label="価格"
          onChange={onPriceChange}
        />
        <TextField
          value={webhookURL}
          variant="outlined"
          margin="normal"
          fullWidth
          id="webhookURL"
          label="WebhookURL"
          onChange={onWebhookURLChange}
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
        {'プライベート設定'}
        <Switch checked={privateFlag} onChange={onPrivateFlagChange} />
        <h2>概要プレビュー</h2>
        <MarkdownView text={overview} />
        <MarkdownView text={rules} />
        <Button type="submit" fullWidth variant="contained" color="primary">
          投稿
        </Button>
      </form>
    </React.Fragment>
  );
};

export default ChallengeForm;

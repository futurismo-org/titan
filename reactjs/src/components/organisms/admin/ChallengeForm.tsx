import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import gql from 'graphql-tag';

const ChallengeForm = (props: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [overview, setOverview] = useState('');
  const [rules, setRules] = useState('');

  const onTilteChange = (e: any) => setTitle(e.target.value);
  const onDescriptionChange = (e: any) => setDescription(e.target.value);
  const onOverviewChange = (e: any) => setOverview(e.target.value);
  const onRulesChange = (e: any) => setRules(e.target.value);

  const UPDATE_CHALLENGE = gql`
    mutation updateChallenge(
      $title: String!
      $description: String!
      $overview: String!
      $rules: String!
    ) {
      updateChallenge(
        title: $title
        description: $description
        overview: $overview
        rules: $rules
      ) {
        id
      }
    }
  `;

  const GET_CHALLENGE = gql`
    query GetChallenge($id: ID!) {
      challenge(id: $id) {
        id
        title
        description
        overview
        rules
      }
    }
  `;

  const getHandler = useQuery(GET_CHALLENGE, {
    variables: { id: props.match.params.id }
  });

  useEffect(() => {
    const { data } = getHandler;
    const { challenge } = data;

    if (challenge !== undefined) {
      setTitle(challenge.title);
      setDescription(challenge.description);
      setOverview(challenge.overview);
      setRules(challenge.rules);
    }
  }, [getHandler]);

  const pageTitle =
    props.match.params.id === undefined
      ? 'チャレンジ新規投稿'
      : 'チャレンジ編集';

  const updateChallenge = useMutation(UPDATE_CHALLENGE, {
    variables: { title, description, overview, rules }
  });

  const updateHandler = (e: any) => {
    e.preventDefault();
    updateChallenge();
    window.location.href = '/#/admin'; // eslint-disable-line
  };

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
          autoFocus
          onChange={onTilteChange}
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
          onChange={onRulesChange}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          投稿
        </Button>
      </form>
    </React.Fragment>
  );
};

export default ChallengeForm;

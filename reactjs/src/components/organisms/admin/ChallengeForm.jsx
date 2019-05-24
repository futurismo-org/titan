import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import gql from "graphql-tag";
import { useMutation } from "react-apollo-hooks";

const ChallengeForm = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [overview, setOverview] = useState("");
  const [rules, setRules] = useState("");

  const onTilteChange = e => setTitle(e.target.value);
  const onDescriptionChange = e => setDescription(e.target.value);
  const onOverviewChange = e => setOverview(e.target.value);
  const onRulesChange = e => setRules(e.target.value);

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

  const updateChallenge = useMutation(UPDATE_CHALLENGE, {
    variables: { title, description, overview, rules }
  });

  return (
    <React.Fragment>
      <h2>チャレンジ新規投稿</h2>
      <form noValidate onSubmit={updateChallenge}>
        <TextField
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
          variant="outlined"
          margin="normal"
          fullWidth
          id="overview"
          name="overview"
          label="概要"
          onChange={onOverviewChange}
        />
        <TextField
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

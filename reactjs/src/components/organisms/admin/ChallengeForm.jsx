import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import gql from "graphql-tag";
import { useMutation } from "react-apollo-hooks";

import client from "../../../lib/apollo";

const ChallengeForm = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onTilteChange = e => setTitle(e.target.value);
  const onDescriptionChange = e => setDescription(e.target.value);

  const UPDATE_CHALLENGE = gql`
    mutation updateChallenge($title: String!, $description: String!) {
      updateChallenge(
        title: $title
        description: $description
        overview: ""
        rules: ""
      ) {
        id
      }
    }
  `;

  const updateChallenge = useMutation(UPDATE_CHALLENGE, {
    variables: { title, description }
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
        {/* TODO overview and Rules with Markdown */}
        <Button type="submit" fullWidth variant="contained" color="primary">
          投稿
        </Button>
      </form>
    </React.Fragment>
  );
};

export default ChallengeForm;

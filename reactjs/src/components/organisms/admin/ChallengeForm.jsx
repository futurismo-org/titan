import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ChallengeOverview from "../../molecules/challenges/ChallengeOverview";

const ChallengeForm = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onTilteChange = e => setTitle(e.target.value);
  const onDescriptionChange = e => setDescription(e.target.value);
  const onSubmit = e => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <h2>チャレンジ新規投稿</h2>
      <form noValidate onSubmit={onSubmit}>
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
          id="discription"
          name="discription"
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

import React, { useState } from 'react';
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid
} from '@material-ui/core';
import shortId from 'shortid';
import { create } from '~/lib/firebase';
import {
  NOTE_TYPE_SUCCESS,
  NOTE_TYPE_ANALYSIS,
  NOTE_TYPE_DEFAULT
} from '~/constants/note';

const ChallengeNoteForm = (props: any) => {
  const { challenge, user } = props;

  const [text, setText] = useState('');
  const [label, setLabel] = useState(NOTE_TYPE_DEFAULT);

  const onTextChange = (e: any) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const onLabelChange = (e: any) => {
    e.preventDefault();
    setLabel(e.target.value);
  };

  const onSave = () => {
    if (text.length === 0) {
      window.alert('投稿内容がありません。'); // eslint-disable-line
      return;
    }

    const noteId = shortId.generate();
    const resourceId = `/challenges/${challenge.id}/notes/${noteId}`;

    const data = {
      id: noteId,
      text,
      type: label,
      userId: user.shortId,
      userName: user.displayName,
      userPhotoURL: user.photoURL,
      challengeId: challenge.id,
      challengeTitle: challenge.title,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    create(resourceId, data)
      .then(() => window.alert('投稿しました')) // eslint-disable-line
      .then(() => window.location.reload()); // eslint-disable-line
  };

  return (
    <div>
      <p>ノートを投稿する。</p>
      <TextField
        value={text}
        variant="outlined"
        margin="normal"
        required
        id="note"
        label="ノート"
        fullWidth
        multiline
        rows={8}
        onChange={onTextChange}
      />
      <Grid container direction="row" justify="flex-end">
        <Grid item>
          <RadioGroup
            aria-label="label"
            name="ラベル"
            value={label}
            onChange={onLabelChange}
            row
          >
            <FormControlLabel
              value={NOTE_TYPE_DEFAULT}
              control={<Radio color="primary" />}
              label="メモ"
            />
            <FormControlLabel
              value={NOTE_TYPE_SUCCESS}
              control={<Radio color="primary" />}
              label="達成記録"
            />
            <FormControlLabel
              value={NOTE_TYPE_ANALYSIS}
              control={<Radio color="primary" />}
              label="分析記録"
            />
          </RadioGroup>
        </Grid>
        <Grid item>
          <Button color="primary" onClick={onSave} variant="contained">
            投稿
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ChallengeNoteForm;

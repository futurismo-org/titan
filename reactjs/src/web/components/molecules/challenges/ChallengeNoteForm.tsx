import React, { useState } from 'react';
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid
} from '@material-ui/core';
import {
  POST_TYPE_SUCCESS,
  POST_TYPE_ANALYSIS,
  POST_TYPE_NOTE
} from '~/constants/post';

const ChallengeNoteForm = (props: any) => {
  const { saveHandler } = props;

  const [text, setText] = useState('');
  const [label, setLabel] = useState(POST_TYPE_NOTE);

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

    saveHandler({ text, type: label }).then(() => window.alert('投稿しました')); // eslint-disable-line
    // .then(() => window.location.reload()); // eslint-disable-line
  };

  return (
    <React.Fragment>
      <p>メモを投稿する。</p>
      <TextField
        value={text}
        variant="outlined"
        margin="normal"
        required
        id="note"
        label="メモ"
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
              value={POST_TYPE_NOTE}
              control={<Radio color="primary" />}
              label="メモ"
            />
            <FormControlLabel
              value={POST_TYPE_SUCCESS}
              control={<Radio color="primary" />}
              label="達成メモ"
            />
            <FormControlLabel
              value={POST_TYPE_ANALYSIS}
              control={<Radio color="primary" />}
              label="分析メモ"
            />
          </RadioGroup>
        </Grid>
        <Grid item>
          <Button color="primary" onClick={onSave} variant="contained">
            投稿
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ChallengeNoteForm;

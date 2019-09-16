import React, { useState } from 'react';
import {
  TextField,
  Button,
  RadioGroup,
  Grid,
  FormControlLabel,
  Radio
} from '@material-ui/core';

import { withRouter } from 'react-router-dom';

const REVIEW_TYPE_DAYLY = '日次レビュー';
const REVIEW_TYPE_WEEKLY = '週次レビュー';
const REVIEW_TYPE_MONTHLY = '月次レビュー';

const ReviewForm = (props: any) => {
  const { redirectPath, history, saveHandler } = props;

  const [text, setText] = useState('');
  const [type, setType] = useState(REVIEW_TYPE_DAYLY);

  const onTextChange = (e: any) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const onTypeChange = (e: any) => {
    e.preventDefault();
    setType(e.target.value);
  };

  const onSave = () => {
    if (text.length === 0) {
      window.alert('投稿内容がありません。'); // eslint-disable-line
      return;
    }

    saveHandler({ text, type })
      .then(() => window.alert('投稿しました。')) // eslint-disable-line
      .then(() => history.push(redirectPath));
  };

  return (
    <React.Fragment>
      <Grid container direction="row">
        <Grid item>
          <RadioGroup name="タイプ" value={type} onChange={onTypeChange} row>
            <FormControlLabel
              value={REVIEW_TYPE_DAYLY}
              control={<Radio color="primary" />}
              label={REVIEW_TYPE_DAYLY}
            />
            <FormControlLabel
              value={REVIEW_TYPE_WEEKLY}
              control={<Radio color="primary" />}
              label={REVIEW_TYPE_WEEKLY}
            />
            <FormControlLabel
              value={REVIEW_TYPE_MONTHLY}
              control={<Radio color="primary" />}
              label={REVIEW_TYPE_MONTHLY}
            />
          </RadioGroup>
        </Grid>
      </Grid>
      <TextField
        value={text}
        variant="outlined"
        margin="normal"
        fullWidth
        id="text"
        name="text"
        label="内容"
        rows={12}
        multiline
        onChange={onTextChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        style={{ fontWeight: 'bold' }}
        onClick={onSave}
      >
        投稿
      </Button>
    </React.Fragment>
  );
};

export default withRouter(ReviewForm);

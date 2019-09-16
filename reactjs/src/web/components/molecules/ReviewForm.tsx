import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

const ReviewForm = (props: any) => {
  const [text, setText] = useState('');

  const onTextChange = (e: any) => {
    e.preventDefault();
    setText(e.target.value);
  };

  return (
    <React.Fragment>
      <form noValidate onSubmit={() => {}}>
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
        >
          投稿
        </Button>
      </form>
    </React.Fragment>
  );
};

export default ReviewForm;

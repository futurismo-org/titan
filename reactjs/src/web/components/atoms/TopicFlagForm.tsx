import React, { useState } from 'react';

import { TextField, Button } from '@material-ui/core';
import { carouselGray } from '~/lib/theme';

const TopicFlagForm = (props: any) => {
  const [content, setContent] = useState('');

  const onContentChange = (e: any) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const postHandler = (data: any) => {};

  return (
    <React.Fragment>
      <TextField
        value={content}
        variant="outlined"
        margin="normal"
        required
        id="content"
        label="問題の内容"
        fullWidth
        multiline
        rows={8}
        style={{
          backgroundColor: carouselGray
        }}
        InputProps={{
          style: {
            color: '#fff'
          }
        }}
        FormHelperTextProps={{
          style: {
            color: '#fff'
          }
        }}
        SelectProps={{
          style: {
            color: '#fff'
          }
        }}
        InputLabelProps={{
          style: {
            color: '#fff'
          }
        }}
        onChange={onContentChange}
      />
      <br />
      <br />
      <span style={{ color: carouselGray }}>
        報告されたコンテンツについては、Titanの運営が毎日24時間体制で審査し、
        そのコンテンツを削除するか、センシティブフィルターの対象にするか、報告を却下するかを決定します。
      </span>
      <br />
      <br />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        style={{ color: carouselGray }}
        onClick={() =>
          postHandler({
            content
          })
        }
      >
        報告する
      </Button>
    </React.Fragment>
  );
};

export default TopicFlagForm;

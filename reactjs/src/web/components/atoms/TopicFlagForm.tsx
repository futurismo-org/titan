import React, { useState } from 'react';

import { TextField, Button } from '@material-ui/core';
import { carouselGray } from '~/lib/theme';

import { postSubmission } from '~/lib/formcarry';

const TopicFlagForm = (props: any) => {
  const { topic, type, reportUser, handleClose } = props;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onTitleChange = (e: any) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const onContentChange = (e: any) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const url = location.href; // eslint-disable-line

  const postHandler = (data: any) => {
    const params = {
      url: url,
      topicTitle: topic.title,
      topicId: topic.id,
      topicType: type,
      postUserName: topic.userName,
      postUserId: topic.userId,
      reportUserName: reportUser.displayName,
      reportUserId: reportUser.id,
      reportUserShortId: reportUser.shortId,
      reportedAt: new Date(),
      ...data
    };
    postSubmission(params)
      .then(() => handleClose())
      .then(() => window.alert('報告が完了しました。')); // eslint-disable-line
  };

  return (
    <React.Fragment>
      <TextField
        value={title}
        variant="outlined"
        margin="normal"
        required
        id="title"
        label="タイトル"
        fullWidth
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
        onChange={onTitleChange}
      />
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
            content,
            title
          })
        }
      >
        報告する
      </Button>
    </React.Fragment>
  );
};

export default TopicFlagForm;

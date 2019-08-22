import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import shortId from 'shortid';
import { create } from '~/lib/firebase';

const ChallengeNoteForm = (props: any) => {
  const { challenge, user } = props;

  const [text, setText] = useState('');

  const onTextChange = (e: any) => {
    e.preventDefault();
    setText(e.target.value);
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
      <Button color="primary" onClick={onSave} variant="contained">
        投稿
      </Button>
    </div>
  );
};

export default ChallengeNoteForm;

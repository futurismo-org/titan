import React, { useState, useEffect } from 'react';
import { ulid } from 'ulid';
import { TextField, Button } from '@material-ui/core';

const DiscussionForm = (props: any) => {
  const { type } = props;

  const [title, setTitle] = useState('');
  const [url, setURL] = useState('');
  const [text, setText] = useState('');

  const onTitleChange = (e: any) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  const onURLChange = (e: any) => {
    e.preventDefault();
    setURL(e.target.value);
  };
  const onTextChange = (e: any) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const isCreate = props.match === undefined;

  const updateHandler = (e: any) => {
    e.preventDefault();

    const id = isCreate ? ulid() : props.match.params.id;
    const newData = {
      id: id,
      title: title,
      url: url,
      text: text
    };

    // TODO
    // firebase
    //   .firestore()
    //   .collection('categories')
    //   .doc(id)
    //   .set(newData);
    // window.location.href = '/#/admin'; // eslint-disable-line
  };

  useEffect(() => {
    if (!isCreate) {
      // firebase
      //   .firestore()
      //   .collection('categories')
      //   .doc(props.match.params.id)
      //   .get()
      //   .then(doc => doc.data())
      //   .then(challenge => {
      //     setTitle(challenge!.title);
      //     setDescription(challenge!.description);
      //     setOverview(challenge!.overview);
      //     setChannelId(challenge!.channelId);
      //     setChallengeRefs(
      //       !challenge!.challengeRefs
      //         ? ''
      //         : challenge!.challengeRefs
      //             .map(
      //               (docRef: firebase.firestore.DocumentReference) =>
      //                 docRef.path
      //             )
      //             .toString()
      //     );
      //     setCreatedAt(
      //       moment(challenge!.createdAt.toDate()).format('YYYY-MM-DD')
      //     );
      //   });
    }
  }, [isCreate]);

  return (
    <React.Fragment>
      <form noValidate onSubmit={updateHandler}>
        <TextField
          value={title}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label="タイトル"
          name="title"
          autoFocus
          onChange={onTitleChange}
        />
        <TextField
          value={url}
          variant="outlined"
          margin="normal"
          fullWidth
          id="url"
          name="url"
          label="URL"
          onChange={onURLChange}
        />
        or
        <TextField
          value={text}
          variant="outlined"
          margin="normal"
          fullWidth
          id="text"
          name="text"
          label="テキスト"
          rows={6}
          multiline
          onChange={onTextChange}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          投稿
        </Button>
      </form>
    </React.Fragment>
  );
};

export default DiscussionForm;

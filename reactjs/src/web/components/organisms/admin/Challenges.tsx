import { useCollection } from 'react-firebase-hooks/firestore';

import Button from '@material-ui/core/Button';
import * as React from 'react';

import { List, ListItem, ListItemText } from '@material-ui/core';
import shortid from 'shortid';
import { isClosed } from '~/lib/moment';
import firebase from '~/lib/firebase';
import Progress from '../../atoms/CircularProgress';

import Link from '../../atoms/NoStyledLink';
import PostButton from '../../atoms/PostButton';

import { aggregateChallenge } from '~/lib/challenge';

const Challenges = () => {
  const [value, loading, error] = useCollection(
    firebase.firestore().collection('challenges')
  );

  const onCopyHandler = async (id: string) => {
    const doc = await firebase
      .firestore()
      .collection('challenges')
      .doc(id)
      .get();

    const data = doc.data();
    const uid = shortid.generate();

    data!.id = uid;
    data!.title = `${data!.title} - Copy`;
    data!.draft = true;
    data!.participantsCount = 0;

    firebase
      .firestore()
      .collection('challenges')
      .doc(uid)
      .set(data!);
  };

  const ChallengeItem = (props: any) => {
    const { doc } = props;

    const challenge = doc.data();

    return (
      <ListItem>
        <ListItemText>
          {challenge.id}
          <br />
          {challenge.title}
        </ListItemText>
        <Link to={`/admin/c/${doc.id}/edit`}>
          <Button type="button" color="primary" variant="contained">
            編集
          </Button>
        </Link>
        <Button
          type="button"
          color="secondary"
          variant="contained"
          onClick={() => onCopyHandler(doc.id)}
        >
          複製
        </Button>
        <Link to={`/c/${doc.id}/overview`}>
          <Button type="button" color="default" variant="contained">
            閲覧
          </Button>
        </Link>
        <Button
          type="button"
          color="default"
          variant="contained"
          onClick={() =>
            aggregateChallenge(doc.id, challenge.categoryRef).then(
              () => window.alert('集計が完了しました') // eslint-disable-line
            )
          }
        >
          集計
        </Button>
      </ListItem>
    );
  };

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      <h1>チャレンジ</h1>
      <h2>開催チャレンジ一覧</h2>
      <PostButton to="/admin/c/new" />
      {value && (
        <List>
          {value!.docs
            .filter(
              (doc: any) =>
                !isClosed(doc.data().closedAt.toDate()) && !doc.data().draft
            )
            .map((doc: any) => (
              <ChallengeItem doc={doc} key={doc.id} />
            ))}
        </List>
      )}
      <h2>下書きチャレンジ一覧</h2>
      {value && (
        <List>
          {value!.docs
            .filter((doc: any) => doc.data().draft)
            .map((doc: any) => (
              <ChallengeItem doc={doc} key={doc.id} />
            ))}
        </List>
      )}
      <h2>過去のチャレンジ一覧</h2>
      {value && (
        <List>
          {value!.docs
            .filter((doc: any) => isClosed(doc.data().closedAt.toDate()))
            .map((doc: any) => (
              <ChallengeItem doc={doc} key={doc.id} />
            ))}
        </List>
      )}
    </React.Fragment>
  );
};

export default Challenges;

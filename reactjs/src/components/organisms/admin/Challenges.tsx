import { useMutation, useQuery } from 'react-apollo-hooks';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import * as React from 'react';
import gql from 'graphql-tag';

const GET_CHALLENGES = gql`
  {
    challenges {
      id
      title
    }
  }
`;

const DELETE_CHALLENGE = gql`
  mutation deleteChallenge($id: ID!) {
    deleteChallenge(id: $id)
  }
`;

const Challenges = props => {
  const { data, error, loading } = useQuery(GET_CHALLENGES);

  const onDeleteHandler = useMutation(DELETE_CHALLENGE);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <React.Fragment>
      <h2>チャレンジ一覧</h2>
      <Link to="/admin/challenges/new">
        <Button type="button" variant="contained" color="primary">
          新規投稿
        </Button>
      </Link>
      <ul>
        {data.challenges.map(challenge => {
          return (
            <li key={challenge.id}>
              {challenge.title}
              <Link
                to={`/admin/challenges/new/${challenge.id}`}
                style={{ textDecoration: 'none' }}
              >
                <Button type="button" color="primary">
                  編集
                </Button>
              </Link>
              <Button
                type="button"
                color="secondary"
                onClick={() =>
                  onDeleteHandler({ variables: { id: challenge.id } })
                }
              >
                削除
              </Button>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default Challenges;

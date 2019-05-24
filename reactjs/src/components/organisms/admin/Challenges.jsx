import React from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "react-apollo-hooks";

import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const GET_CHALLENGES = gql`
  {
    challenges {
      id
      title
    }
  }
`;

const DELETE_CHALLENGE = gql`
  query DeleteChallenge($id: ID!) {
    challenge(id: $id) {
      id
    }
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
        <button type="button">新規投稿</button>
      </Link>
      <ul>
        {data.challenges.map(challenge => {
          return (
            <li key={challenge.id}>
              {challenge.title}
              編集
              <Button
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

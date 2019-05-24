import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";

import { Link } from "react-router-dom";

const GET_CHALLENGES = gql`
  {
    challenges {
      id
      title
    }
  }
`;

const Challenges = props => {
  const { data, error, loading } = useQuery(GET_CHALLENGES);

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
          return <li key={challenge.id}>{challenge.title} 編集 削除</li>;
        })}
      </ul>
    </React.Fragment>
  );
};

export default Challenges;

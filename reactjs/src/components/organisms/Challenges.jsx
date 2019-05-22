import React, { useEffect, useState } from "react";
import fetch from "isomorphic-unfetch";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";

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
    <div>
      <h1>チャレンジ一覧</h1>
      <ul>
        {data.challenges.map(challenge => (
          <li key={challenge.id}>
            <Link to={`/c/${challenge.id}`}>{challenge.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Challenges;

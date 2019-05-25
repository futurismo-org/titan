import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import { Link } from "react-router-dom";

const GET_CATEGORIES = gql`
  {
    categories {
      id
      title
    }
  }
`;

const Categories = props => {
  const { data, error, loading } = useQuery(GET_CATEGORIES);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error!!! {error.message}</div>;
  }

  return (
    <div>
      <h1>カテゴリ一覧</h1>
      <ul>
        {data.categories.map(category => (
          <li key={category.id}>
            <Link to={`/categories/${category.id}`}>{category.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;

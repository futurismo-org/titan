import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import Header from '../molecules/CategoryHeader';
import Body from '../molecules/CategoryBody';
import Navbar from '../molecules/CategoryNavbar';

const GET_CATEGORY = gql`
  query GetCategories($id: ID!) {
    category(id: $id) {
      id
      title
      description
    }
  }
`;

const Category = props => {
  const { data, error, loading } = useQuery(GET_CATEGORY, {
    variables: { id: props.match.params.id }
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error!!!</div>;
  }

  const { category } = data;

  return (
    <div>
      <Header category={category} />
      <Navbar id={category.id} />
      <Body />
    </div>
  );
};

export default Category;

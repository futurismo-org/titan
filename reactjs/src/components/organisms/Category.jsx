import React from 'react';
import Paper from '@material-ui/core/Paper';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import Body from '../molecules/categories/CategoryBody';
import Header from '../molecules/categories/CategoryHeader';
import Navbar from '../molecules/categories/CategoryNavbar';
import Challenges from '../molecules/categories/CategoryChallenges';
import theme from '../../lib/theme';

const GET_CATEGORY = gql`
  query GetCategories($id: ID!) {
    category(id: $id) {
      id
      title
      description
    }
  }
`;

const StyledPaper = styled(Paper)`
  padding: ${theme.spacing(3, 2)};
`;

const Category = props => {
  const { data, error, loading } = useQuery(GET_CATEGORY, {
    variables: { id: props.match.params.id }
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  const { category } = data;

  return (
    <React.Fragment>
      <Header category={category} />
      <StyledPaper>
        <Navbar id={category.id} />
        <Body />
      </StyledPaper>
    </React.Fragment>
  );
};

export default Category;

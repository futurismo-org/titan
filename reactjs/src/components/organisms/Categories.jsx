import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

import theme from '../../lib/theme';
import CategoryCard from '../atoms/CategoryCard';

const GET_CATEGORIES = gql`
  {
    categories {
      id
      title
      description
    }
  }
`;

const StyledCardGrid = styled(Grid)`
  && {
    margin-top: ${theme.spacing(3)}px;
  }
`;

const Categories = props => {
  const { data, error, loading } = useQuery(GET_CATEGORIES);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <React.Fragment>
      <StyledCardGrid container spacing={4}>
        {data.categories.map(category => (
          <CategoryCard category={category} key={category.id} />
        ))}
      </StyledCardGrid>
    </React.Fragment>
  );
};

export default Categories;

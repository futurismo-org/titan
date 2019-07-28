import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import theme from '~/lib/theme';
import CategoryCard from '../atoms/CategoryCard';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';
import Paper from '../templates/PaperWrapper';

interface Props {
  container?: any;
  spacing?: number;
}

const StyledCardGrid = styled(Grid as React.SFC<Props>)`
  && {
    margin-top: ${theme.spacing(3)}px;
  }
`;

const Categories = (props: any) => {
  const { categories, error, loading, fetchCategories } = props;

  React.useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      <Paper>
        <Title text="カテゴリ一覧" />
        {categories && (
          <StyledCardGrid container spacing={4}>
            {categories.map((category: any) => (
              <CategoryCard category={category} key={category.id} />
            ))}
          </StyledCardGrid>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default Categories;

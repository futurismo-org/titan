import React from 'react';
import Grid, { GridProps } from '@material-ui/core/Grid';
import styled from 'styled-components';
import { isLoaded } from 'react-redux-firebase';
import theme from '~/lib/theme';
import CollectionCard from '~/web/containers/CollectionCardContainer';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';
import Paper from '../templates/PaperWrapper';

const StyledCardGrid = styled(Grid)`
  && {
    margin-top: ${theme.spacing(3)}px;
  }
` as React.ComponentType<GridProps>;

const Categories = (props: any) => {
  const { categories } = props;

  return (
    <React.Fragment>
      {!isLoaded(categories) && <Progress />}
      <Paper>
        <Title text="カテゴリ一覧" />
        {isLoaded(categories) && !!categories && (
          <StyledCardGrid container spacing={4}>
            {categories.map((category: any) => (
              <CollectionCard
                type="categories"
                collection={category}
                key={category.id}
              />
            ))}
          </StyledCardGrid>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default Categories;

import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { useCollection } from 'react-firebase-hooks/firestore';
import CategoryCard from '../atoms/CategoryCard';
import firebase from '../../lib/firebase';
import theme from '../../lib/theme';

interface Props {
  container?: any;
  spacing?: number;
}

const StyledCardGrid = styled(Grid as React.SFC<Props>)`
  && {
    margin-top: ${theme.spacing(3)}px;
  }
`;

const Categories = () => {
  const [value, loading, error] = useCollection(
    firebase.firestore().collection('categories')
  );

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
        <StyledCardGrid container spacing={4}>
          {value!.docs.map((doc: any) => (
            <CategoryCard category={doc.data()} key={doc.id} />
          ))}
        </StyledCardGrid>
      )}
    </React.Fragment>
  );
};

export default Categories;

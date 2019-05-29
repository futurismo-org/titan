import Paper from '@material-ui/core/Paper';
import * as React from 'react';
import styled from 'styled-components';
import { useDocument } from 'react-firebase-hooks/firestore';
import theme from '../../lib/theme';
import Navbar from '../molecules/categories/challenges';
import Header from '../molecules/categories/CategoryHeader';
import Body from '../molecules/categories/CategoryBody';

import firebase from '../../lib/firebase';

const StyledPaper = styled(Paper as React.SFC)`
  padding: ${theme.spacing(3, 2)};
`;

interface Props {
  match: {
    params: {
      id?: string;
    };
  };
}

const Category = (props: Props) => {
  const [value, loading, error] = useDocument(
    firebase
      .firestore()
      .collection('categories')
      .doc(props.match.params.id)
  );

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
        <React.Fragment>
          <Header category={value.data()} />
          <StyledPaper>
            <Navbar id={value.id} />
            <Body />
          </StyledPaper>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Category;

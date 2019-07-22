import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

import NoStyledLink from '../NoStyledLink';

const ColorButton = styled(Button)`
  && {
    font-size: 15px;
    margin: 5px;
  }
`;

const ChallengeCategoryButton = (props: any) => {
  const { category } = props;

  const [title, setTitle] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    category && setTitle(category.title);
  }, [category]);

  return (
    <React.Fragment>
      <ColorButton variant="contained" color="default">
        <NoStyledLink to="/">{title}</NoStyledLink>
      </ColorButton>
    </React.Fragment>
  );
};

export default ChallengeCategoryButton;

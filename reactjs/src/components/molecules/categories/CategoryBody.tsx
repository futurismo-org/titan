import * as React from 'react';
import styled from 'styled-components';
import theme from '../../../lib/theme';

const CategoryContent = styled.div`
  padding: ${theme.spacing(2)}px;
`;

const CategoryBody = (props: any) => {
  return (
    <CategoryContent>
      <p>コンテンツ準備中...</p>
    </CategoryContent>
  );
};

export default CategoryBody;

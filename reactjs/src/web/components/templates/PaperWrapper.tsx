import * as React from 'react';
import styled from 'styled-components';
import Paper, { PaperProps } from '@material-ui/core/Paper';

import theme from '~/lib/theme';

const StyledPaper = styled(Paper)`
  && {
    margin: ${theme.spacing(0)}px;
    padding: ${theme.spacing(3)}px;
  }
` as React.ComponentType<PaperProps>;

const PaperWrapper = (props: any) => (
  <StyledPaper>{props.children}</StyledPaper>
);

export default PaperWrapper;

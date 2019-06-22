import * as React from 'react';
import styled from 'styled-components';
import Typography, { TypographyProps } from '@material-ui/core/Typography';

import theme from '../../lib/theme';

const StyledTypography = styled(Typography)`
  && {
    margin-bottom: ${theme.spacing(3)}px;
  }
` as React.ComponentType<TypographyProps>;

interface Props {
  text: string;
}

const Title = (props: Props) => (
  <StyledTypography component="h3" variant="h4">
    {props.text}
  </StyledTypography>
);

export default Title;

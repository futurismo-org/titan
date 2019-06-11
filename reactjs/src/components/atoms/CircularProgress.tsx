import * as React from 'react';
import CircularProgress, {
  CircularProgressProps
} from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const StyledProgress = styled(CircularProgress)`
  && {
    margin: 0 auto;
    display: block;
  }
` as React.ComponentType<CircularProgressProps>;

const Progress = () => (
  <div>
    <StyledProgress />
  </div>
);

export default Progress;

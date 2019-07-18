import * as React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledRecordButton = styled(Button)`
  && {
    font-size: 18px;
    margin: 5px;
  }
`;

const RecordButton = (props: any) => (
  <StyledRecordButton
    variant="contained"
    color={props.color}
    onClick={props.handleClick}
  >
    {props.text}
  </StyledRecordButton>
);

export default RecordButton;

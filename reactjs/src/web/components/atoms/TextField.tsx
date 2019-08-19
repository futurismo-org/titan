import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import { primaryColor } from '~/lib/theme';

const color = primaryColor;

const StyledTextField = styled(TextField)`
  && {
    label.Mui-focused {
      color: ${color};
    }
    .MuiOutlinedInput-root {
      &:hover fieldset {
        border-color: ${color};
      }
      &.focused fieldset {
        border-color: ${color};
      }
    }
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${color};
    }
  }
` as React.ComponentType<TextFieldProps>;

export default StyledTextField;

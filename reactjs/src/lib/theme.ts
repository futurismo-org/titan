import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';

export const primaryColor = '#f44336';

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: blue
  }
});

export default theme;

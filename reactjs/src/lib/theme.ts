import { createMuiTheme } from '@material-ui/core/styles';

import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';

export const primaryColor = '#f44336';
export const secondaryColor = '#2196f3';
export const brandSuccess = '#5cb85c';
export const brandDanger = '#d9534f';
export const brandWarning = '#f0ad4e';
export const brandDark = '#1a1917';
export const brandGray = '#888888';
export const brandLight = '#f4f4f4';

export const leaderboardMyColor = '#FFE4E1';

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: blue
  },
  typography: {
    fontFamily: 'M Plus 1p'
  }
});

export default theme;

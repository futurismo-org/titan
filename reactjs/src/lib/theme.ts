import { createMuiTheme } from '@material-ui/core/styles';

import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';

export const primaryColor = '#f44336';
export const secondaryColor = '#2196f3';
export const brandSuccess = '#5cb85c';
export const brandDanger = '#d9534f';
export const brandWarning = '#f0ad4e';
export const brandPink = '#ff80ab';
export const brandDark = '#1a1917';
export const brandGray = '#888888';
export const brandLightGray = '#d3d3d3';
export const brandLight = '#f4f4f4';
export const brandWhite = '#ffffff';

export const leaderboardMyColor = '#FFE4E1';
export const twitterColor = '#4099FF';

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: blue
  },
  typography: {
    fontFamily: 'M Plus 1p'
  }
});

export const previewImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8hQDwAEiAGBKJM0UQAAAABJRU5ErkJggg==' as any;

export default theme;

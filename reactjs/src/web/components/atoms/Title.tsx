import * as React from 'react';
import Typography from '@material-ui/core/Typography';

interface Props {
  text: string;
}

const Title = (props: Props) => (
  <Typography component="h2" variant="h5" gutterBottom>
    {props.text}
  </Typography>
);

export default Title;

import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import theme from '../../lib/theme';
import ChallengeCard from '../atoms/ChallengeCard';
import CategoryCard from '../atoms/CategoryCard';

interface Props {
  container?: any;
  spacing?: number;
}

const StyledCardGrid = styled(Grid as React.SFC<Props>)`
  && {
    margin-top: ${theme.spacing(3)}px;
  }
`;

const DashBoardCard = (props: any) => {
  const { type, doc } = props;
  if (type === 'challenge') {
    return <ChallengeCard challenge={doc.data()} key={doc.id} />;
  }
  if (type === 'category') {
    return <CategoryCard category={doc.data()} key={doc.id} />;
  }
};

const DashBoardPaper = (props: any) => {
  const { value, title, type } = props;

  return (
    <React.Fragment>
      <Paper>
        <Typography component="h3" variant="h4">
          {title}
        </Typography>
        {value && (
          <StyledCardGrid container spacing={4}>
            {value!.docs.map((doc: any) =>
              DashBoardCard({ doc: doc, type: type })
            )}
          </StyledCardGrid>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default DashBoardPaper;

import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper, { PaperProps } from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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

const StyledPaper = styled(Paper)`
  && {
    margin: ${theme.spacing(3)}px;
    padding: ${theme.spacing(3)}px;
  }
` as React.ComponentType<PaperProps>;

const MoreLink = styled(Link)`
  && {
    text-decoration: none;
    color: inherit;
    text-align: right;
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

const DashBoardCardLink = (props: any) => {
  const { type } = props;
  if (type === 'challenge') {
    return (
      <MoreLink to="/challenges">
        <Typography variant="subtitle1" color="primary">
          もっと見る
        </Typography>
      </MoreLink>
    );
  }
  if (type === 'category') {
    return (
      <MoreLink to="/categories">
        <Typography variant="subtitle1" color="primary">
          もっと見る
        </Typography>
      </MoreLink>
    );
  }
};

const DashBoardPaper = (props: any) => {
  const { value, title, type } = props;

  return (
    <React.Fragment>
      <StyledPaper>
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
        {DashBoardCardLink({ type: type })}
      </StyledPaper>
    </React.Fragment>
  );
};

export default DashBoardPaper;

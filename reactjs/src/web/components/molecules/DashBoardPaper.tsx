import * as React from 'react';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '~/lib/theme';
import ChallengeCard from '../atoms/challenges/ChallengeCard';
import CategoryCard from '../atoms/CategoryCard';

import Paper from '../templates/PaperWrapper';
import Title from '../atoms/Title';

interface Props {
  container?: any;
  spacing?: number;
}

const StyledCardGrid = styled(Grid as React.SFC<Props>)`
  && {
    margin-top: ${theme.spacing(3)}px;
  }
`;

const MoreLink = styled(Link)`
  && {
    text-decoration: none;
    color: inherit;
    text-align: right;
  }
`;

const DashBoardCard = (props: any) => {
  const { type, item } = props;

  return (
    <React.Fragment key={item.id}>
      {type === 'challenge' && <ChallengeCard challenge={item} />}
      {type === 'category' && <CategoryCard category={item} />}
    </React.Fragment>
  );
};

const DashBoardCardLink = (props: any) => {
  const { type } = props;

  return (
    <React.Fragment>
      {type === 'challenge' && (
        <MoreLink to="/challenges">
          <Typography variant="subtitle1" color="primary">
            もっと見る
          </Typography>
        </MoreLink>
      )}
      {type === 'category' && (
        <MoreLink to="/categories">
          <Typography variant="subtitle1" color="primary">
            もっと見る
          </Typography>
        </MoreLink>
      )}
    </React.Fragment>
  );
};

const DashBoardPaper = (props: any) => {
  const { items, title, type } = props;

  return (
    <React.Fragment>
      <Paper>
        <Title text={title} />
        <StyledCardGrid container spacing={4}>
          {items.map((item: any) => DashBoardCard({ item, type }))}
        </StyledCardGrid>
        {DashBoardCardLink({ type })}
      </Paper>
    </React.Fragment>
  );
};

export default DashBoardPaper;

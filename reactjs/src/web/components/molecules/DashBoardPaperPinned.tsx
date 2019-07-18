import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import theme from 'lib/theme';
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

const DashBoardCard = (props: any) => {
  const { type, doc } = props;

  return (
    <React.Fragment key={doc.id}>
      {type === 'pinned-challenge' && <ChallengeCard challenge={doc.data()} />}
      {type === 'pinned-category' && <CategoryCard category={doc.data()} />}
    </React.Fragment>
  );
};

const DashBoardPaper = (props: any) => {
  const { value, title, type } = props;

  return (
    <React.Fragment>
      <Paper>
        <Title text={title} />
        {value && (
          <StyledCardGrid container spacing={4}>
            {value!.docs
              .filter((doc: any) => doc.data().pinned)
              .map((doc: any) => DashBoardCard({ doc, type }))}
          </StyledCardGrid>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default DashBoardPaper;
